import logoImg from "../src/assets/quiz-logo.png";
import Quiz from "./components/Quiz";

function App() {
  return (
    <div>
      <header>
        <image src={logoImg}></image>
        <h1>Victorina</h1>
      </header>
      <main>
        <Quiz />
      </main>
    </div>
  );
}

export default App;
