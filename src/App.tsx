import Timer from "./components/Timer";
import RedoButton from "./components/RedoButton";
import Stats from "./components/Stats";
import WordsContainer from "./components/WordsContainer";
import useTest from "./hooks/useTest";
import { calculateAccuracy } from "./utils/helpers";

function App() {
  const { state, words, timeLeft, typed, errors, totalCharsTyped, restart } = useTest();

  return (
    <>
      <Timer timeLeft={timeLeft}/>
      <WordsContainer 
        wordsGenerated={words}
        userInput={typed}
      />
      <RedoButton 
        onRestart={restart}
        className={"mx-auto mt-10 text-slate-500"}
      />
      { 
        state === "done" && 
        <Stats
          accuracy={calculateAccuracy(errors, totalCharsTyped)}
          wordsTyped={totalCharsTyped}
          errors={errors}
          className="mt-10"
        />
      }
    </>
  );
}

export default App;
