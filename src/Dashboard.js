export function Dashboard() {
  const weights = [
    { index: 1, weight: 70, date: '14.10' },
    { index: 2, weight: 65, date: '15.10' },
  ];

  return (
    <div>
      <h2>Was ist dein Gewicht?</h2>
      <input />
      <button>Schicken</button>
      <h2>Dein Gewichtsverlauf</h2>
      <table>
        <tr>
          <th>date</th>
          <th>weight</th>
        </tr>
        {weights.map((weight) => {
          return (
            <tr key={weight.index}>
              <td>{weight.date}</td>
              <td>{weight.weight} kg</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
