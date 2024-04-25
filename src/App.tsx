import Timer from "./components/Timer";
import RedoButton from "./components/RedoButton";
import Stats from "./components/Stats";
import WordsContainer from "./components/WordsContainer";
import useTest from "./hooks/useTest";
import Header from "./components/Header";
import { calculateAccuracy } from "./utils/helpers";
import { DONE_STATE } from "./constants";

function App() {
  const { state, words, timeLeft, typed, errors, totalCharsTyped, restart } = useTest();
  const isDone = state === DONE_STATE;

  return (
    <>
      <Header/>
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
        isDone && 
        <Stats
          accuracy={calculateAccuracy(errors, totalCharsTyped)}
          charsTyped={totalCharsTyped}
          errors={errors}
          className="mt-10"
        />
      }
    </>
  );
}

export default App;
