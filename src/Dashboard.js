import './Dashboard.css';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from './AuthProvider';
import { getUserWeights, postNewWeight } from './API';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const [weights, setWeights] = useState(null);
  const [error, setError] = useState(null);
  const [postingError, setPostingError] = useState(null);
  const [loading, setLoading] = useState(true);
  const weightRef = useRef(null);
  const { logout } = useAuth();
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setWeights(await getUserWeights(logout));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [logout]);

  function addNewWeight(event) {
    event.preventDefault();
    const sendData = async () => {
      try {
        postNewWeight(weightRef.current.value, logout);
      } catch (err) {
        setPostingError(true);
      } finally {
        setPostingError(false);
        weightRef.current.value = '';
        setWeights(await getUserWeights(logout));
      }
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
        {userInfo.value.payload && userInfo.value.payload.username ? (
          <h1>Hallo, {userInfo.value.payload.username}! </h1>
        ) : (
          <h1>Hallo,</h1>
        )}
        <h2>Was ist dein Gewicht heute?</h2>
        <div className="inputContainer">
          <input className="input" ref={weightRef} />
          <button className="checkmarkButton" onClick={addNewWeight}>
            {'\u2713'}
          </button>
        </div>
        <h2>Dein Gewichtsverlauf</h2>
        <table>
          <thead>
            <tr>
              <th>Eintragszeit</th>
              <th>Gewicht</th>
            </tr>
          </thead>
          <tbody>
            {weights.map((entry) => {
              return (
                <tr key={entry.entry_id}>
                  <td>
                    {new Date(entry.creation_time).toLocaleString('de-DE', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
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
