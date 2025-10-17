import './Kontakt.css';
import { useRef } from 'react';

export function Kontakt() {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  function sendMessage(event) {
    event.preventDefault();
    const title = titleRef.current.value
    const body = bodyRef.current.value
    postMessage(title, body)
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
