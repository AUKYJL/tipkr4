import { useEffect, useState } from "react";
import GuessForm from "./components/GuessForm";
import History from "./components/History";


export default function App() {
  const generateNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  }

  const [secret, setSecret] = useState(
    () => Number(localStorage.getItem("secret")) || generateNumber()
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState(
    localStorage.getItem("message") || "Попробуйте угадать число!"
  );
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [isFinished, setIsFinished] = useState(
    JSON.parse(localStorage.getItem("isFinished")) || false
  );

  

  const handleGuess = (e) =>{
    e.preventDefault();

    if (!guess) return;

    const userGuess = Number(guess);
    const newHistory = [...history, userGuess];

    if (userGuess === secret) {
      setMessage("Вы угадали!");
      setIsFinished(true);
    } else if (userGuess < secret) {
      setMessage("Загаданное число больше");
    } else {
      setMessage("Загаданное число меньше");
    }

    setHistory(newHistory);
    setGuess("");
  }

  const newGame = () =>{
    const newSecret = generateNumber();
    setSecret(newSecret);
    setHistory([]);
    setGuess("");
    setMessage("Попробуйте угадать число!");
    setIsFinished(false);
  }

  useEffect(() => {
    localStorage.setItem("secret", secret);
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("isFinished", JSON.stringify(isFinished));
    localStorage.setItem("message", message);
  }, [secret, history, isFinished, message]);

  return (
    <div className="container">
      <h1>Игра: Угадай число</h1>
      <p>{message}</p>

      <GuessForm
        guess={guess}
        setGuess={setGuess}
        handleGuess={handleGuess}
        disabled={isFinished}
      />

      <History history={history} />

      <button className="new-game" onClick={newGame}>
        Новая игра
      </button>

      
    </div>
  );
}
