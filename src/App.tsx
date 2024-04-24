import Timer from "./components/Timer";
import RedoButton from "./components/RedoButton";
import Stats from "./components/Stats";
import WordsContainer from "./components/WordsContainer";
import useTest from "./hooks/useTest";

function App() {
  const { state, words, timeLeft, typed } = useTest();

  return (
    <>
      <Timer timeLeft={timeLeft}/>
      <WordsContainer 
        wordsGenerated={words}
        userInput={typed}
      />
      <RedoButton 
        onRestart={() => {}}
        className={"mx-auto mt-10 text-slate-500"}
      />
      <Stats
        accuracy={0}
        wordsTyped={0}
        errors={0}
        className="mt-10"
      />
    </>
  );
}

export default App;
