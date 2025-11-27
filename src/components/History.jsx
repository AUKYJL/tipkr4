export default function History({ history }) {
  return (
    <div className="history">
      <h3>История попыток:</h3>
      {history.length === 0 ? (
        <p>Пока нет попыток</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
