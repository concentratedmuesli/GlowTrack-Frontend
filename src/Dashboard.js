import styles from './Dashboard.module.css';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from './AuthProvider';
import { getUserWeights, postNewWeight } from './API';
import { useSelector } from 'react-redux';
import SEO from './SEO';

export default function Dashboard() {
  const [weights, setWeights] = useState(null);
  const [error, setError] = useState(null);
  const [postingError, setPostingError] = useState(null);
  const [valueError, setValueError] = useState(false);
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
    setValueError(false);
    if (
      weightRef.current.value.trim().length === 0 ||
      isNaN(weightRef.current.value) ||
      weightRef.current.value < 30 ||
      weightRef.current.value > 350
    ) {
      setValueError(true);
      return;
    }
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
      <div className={styles.card}>
        <p>Lädt...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.card}>
        <p>An error occured: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Dashboard – GlowTrack, deine Gewichtsverlaufs-App"
        description="Behalte dein Gewicht mühelos im Blick mit GlowTrack. Trage jetzt dein heutiges Gewicht ein!"
        name="GlowTrack"
        type="website"
      />

      <div className={styles.card}>
        <div className={styles.cardContent}>
          {/* Persönliche Begrüßung */}
          {userInfo.value.payload && userInfo.value.payload.username ? (
            <h1>Hallo, {userInfo.value.payload.username}! </h1>
          ) : (
            <h1>Hallo,</h1>
          )}
          <h2>
            <label htmlFor="weightInput">Was ist dein Gewicht heute?</label>
          </h2>
          <div className={styles.inputContainer}>
            <div className={styles.input}>
              <input
                id="weightInput"
                className={styles.input}
                ref={weightRef}
              />
              <span>kg</span>
            </div>
            <button
              aria-label="gewicht speichern"
              className={styles.checkmarkButton}
              onClick={addNewWeight}
            >
              {'\u2713'}
            </button>
          </div>
          {postingError ? (
            <div className={styles.errorMessage}>
              &#9888; Dein Gewicht konnte nicht gespeichert werden!
            </div>
          ) : (
            <></>
          )}
          {valueError ? (
            <div className={styles.errorMessage}>
              &#9888; Die Eingabe muss eine Zahl zwischen 30 und 350 sein.
            </div>
          ) : (
            <></>
          )}
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
    </>
  );
}
