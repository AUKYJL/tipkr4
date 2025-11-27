export default function GuessForm({ guess, setGuess, handleGuess, disabled }) {
  return (
    <form onSubmit={handleGuess}>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Введите число"
        disabled={disabled}
      />
      <button disabled={disabled}>Проверить</button>
    </form>
  );
}
