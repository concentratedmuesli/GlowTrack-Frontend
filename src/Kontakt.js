import './Kontakt.css'

export function Kontakt() {

  return (
    <div className="card">
      <h2 className="cardHeader">Kontakt</h2>
      <form className="cardContent">
        <label className="label">Betreff</label>
        <input className="input"/>
        <label className="label">Nachricht</label>
        <textarea rows={5} className="input"/>
        <button className="button">Schicken</button>
      </form>
    </div>
  )
}