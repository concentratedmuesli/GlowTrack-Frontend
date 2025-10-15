import './Dashboard.css';
import { useEffect, useState } from 'react';

export function Dashboard() {
  // const weights = [
  //   { index: 1, entry: 70, date: '14.10' },
  //   { index: 2, entry: 69, date: '15.10' },
  // ];

  const [weights, setWeights] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user-weights', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(
            `Server responded with an error [${response.status}]`
          );
        }
        const data = await response.json();
        setWeights(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [weights]);

  if (loading) {
    return (
      <div className="card">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <p>An error occured: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="cardContent">
        <h2 className="cardHeader">Was ist dein Gewicht heute?</h2>
        <div className="inputContainer">
          <input className="input" />
          <button type="submit" className="checkmarkButton">
            {'\u2713'}
          </button>
        </div>
        <h2 className="cardHeader">Dein Gewichtsverlauf</h2>
        <table>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Gewicht</th>
            </tr>
          </thead>
          <tbody>
            {weights.map((entry) => {
              return (
                <tr key={entry.entry_id}>
                  <td>
                    {new Date(entry.date).toLocaleDateString('de-DE', {
                      dateStyle: 'short',
                    })}
                  </td>
                  <td>{entry.weight} kg</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
