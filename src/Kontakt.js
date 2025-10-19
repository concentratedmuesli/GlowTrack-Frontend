import './Kontakt.css';
import { useRef, useState } from 'react';
import { postMessage } from './API';
import { useAuth } from './AuthProvider';

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
    <div className="card">
      <h2>Kontakt</h2>
      <form className="cardContent">
        <label className="label">Betreff</label>
        <input ref={titleRef} className="input" />
        {missingTitle ? <div>Das Betreff kann nicht leer sein.</div> : <></>}
        <label className="label">Nachricht</label>
        <textarea ref={bodyRef} rows={5} className="input" />
        {missingBody ? <div>Die Nachricht kann nicht leer sein.</div> : <></>}
        <button className="button" onClick={sendMessage}>
          Schicken
        </button>
        {postingError ? (
          <div>Deine Nachricht konnte nicht geschickt werden!</div>
        ) : (
          <></>
        )}
        {postingSuccess ? (
          <div>Deine Nachricht wurde erfolgreich gesendet!</div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}
