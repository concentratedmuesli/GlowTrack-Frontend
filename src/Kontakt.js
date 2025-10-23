import styles from './Kontakt.module.css';
import { useRef, useState } from 'react';
import { postMessage } from './API';
import { useAuth } from './AuthProvider';
import SEO from './SEO';

export default function Kontakt() {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const [postingError, setPostingError] = useState(null);
  const { logout } = useAuth();
  const [missingTitle, setMissingTitle] = useState(false);
  const [missingBody, setMissingBody] = useState(false);
  const [postingSuccess, setPostingSuccess] = useState(false);

  function sendMessage(event) {
    event.preventDefault();
    setPostingSuccess(false);
    if (titleRef.current.value.trim().length === 0) {
      setMissingTitle(true);
    } else {
      setMissingTitle(false);
    }
    if (bodyRef.current.value.trim().length === 0) {
      setMissingBody(true);
    } else {
      setMissingBody(false);
    }
    if (
      titleRef.current.value.trim().length === 0 ||
      bodyRef.current.value.trim().length === 0
    ) {
      return;
    }
    const sendData = async () => {
      try {
        postMessage(titleRef.current.value, bodyRef.current.value, logout);
        setPostingError(false);
        setPostingSuccess(true);
        titleRef.current.value = '';
        bodyRef.current.value = '';
      } catch (err) {
        setPostingError(true);
      }
    };
    sendData();
  }

  return (
    <>
      <SEO
        title="Kontakt – GlowTrack, deine Gewichtsverlaufs-App"
        description="Behalte dein Gewicht mühelos im Blick mit GlowTrack. Hast du eine Frage? Schreib uns eine Nachricht!"
        name="GlowTrack"
        type="website"
      />
      <div className={styles.card}>
        <h1>Kontakt</h1>
        <form className={styles.cardContent}>
          <label htmlFor="title" className={styles.label}>
            Betreff
          </label>
          <input id="title" ref={titleRef} className={styles.input} />
          {missingTitle ? (
            <div className={styles.errorMessage}>
              &#9888; Das Betreff kann nicht leer sein.
            </div>
          ) : (
            <></>
          )}
          <label htmlFor="body" className={styles.label}>
            Nachricht
          </label>
          <textarea id="body" ref={bodyRef} rows={5} className={styles.input} />
          {missingBody ? (
            <div className={styles.errorMessage}>
              &#9888; Die Nachricht kann nicht leer sein.
            </div>
          ) : (
            <></>
          )}
          <button className={styles.button} onClick={sendMessage}>
            Schicken
          </button>
          {postingError ? (
            <div className={styles.errorMessage}>
              &#9888; Deine Nachricht konnte nicht geschickt werden!
            </div>
          ) : (
            <></>
          )}
          {postingSuccess ? (
            <div className={styles.successMessage}>
              &#10003; Deine Nachricht wurde erfolgreich gesendet!
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </>
  );
}
