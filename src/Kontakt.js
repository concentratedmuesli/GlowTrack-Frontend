import './Kontakt.css';
import { useRef, useState } from 'react';
import { useAuth } from './AuthProvider';
import { postMessage } from './API';

export default function Kontakt() {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const [postingError, setPostingError] = useState(null);
  const { logout } = useAuth();

  function sendMessage(event) {
    event.preventDefault();
    const sendData = async () => {
      try {
        postMessage(titleRef.current.value, bodyRef.current.value, logout);
      } catch (err) {
        setPostingError(true);
      } finally {
        setPostingError(false);
        titleRef.current.value = '';
        bodyRef.current.value = '';
      }
    };
    sendData();
  }

  return (
    <div className="card">
      <h2 className="cardHeader">Kontakt</h2>
      <form className="cardContent">
        <label className="label">Betreff</label>
        <input ref={titleRef} className="input" />
        <label className="label">Nachricht</label>
        <textarea ref={bodyRef} rows={5} className="input" />
        <button className="button" onClick={sendMessage}>
          Schicken
        </button>
      </form>
    </div>
  );
}
