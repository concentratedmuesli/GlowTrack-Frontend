import './Dashboard.css';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from './AuthProvider';
import { getUserWeights } from './API';

export function Dashboard() {
  const [weights, setWeights] = useState(null);
  const [error, setError] = useState(null);
  const [postingError, setPostingError] = useState(null);
  const [loading, setLoading] = useState(true);
  const weightRef = useRef(null);
  const { user } = useAuth();

  // console.log(weightRef.current.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setWeights(await getUserWeights());
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function addNewWeight(event) {
    event.preventDefault();
    const sendData = async () => {
      fetch('http://localhost:3000/user-weights', {
        method: 'POST',
        body: JSON.stringify({
          userId: user.username,
          weight: weightRef.current.value,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Post request failed with status ${response.status}`
            );
          }
          return response.json();
        })
        .then(() => {
          setPostingError(false);
          weightRef.current.value = '';
        })
        .catch((err) => setPostingError(true));
    };
    sendData();
  }

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
          <input className="input" ref={weightRef} />
          <button className="checkmarkButton" onClick={addNewWeight}>
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
