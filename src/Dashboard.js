import './Dashboard.css';

export function Dashboard() {
  const weights = [
    { index: 1, weight: 70, date: '14.10' },
    { index: 2, weight: 69, date: '15.10' },
  ];

  return (
    <div className="card">
      <div className="cardContent">
      <h2 className='cardHeader'>Was ist dein Gewicht heute?</h2>
        <div className="inputContainer">
      <input className="input"/>
      <button type="submit" className="checkmarkButton">{'\u2713'}</button>
      </div>
      <h2 className='cardHeader'>Dein Gewichtsverlauf</h2>
      <table>
        <thead>
        <tr>
          <th>Datum</th>
          <th>Gewicht</th>
        </tr>
        </thead>
        <tbody>
        {weights.map((weight) => {
          return (
            <tr key={weight.index}>
              <td>{weight.date}</td>
              <td>{weight.weight} kg</td>
            </tr>
          );
        })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
