import RedoButton from "./components/RedoButton";
import Stats from "./components/Stats";
import WordsContainer from "./components/WordsContainer";
import useTest from "./hooks/useTest";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { calculateAccuracy, calculateWordsPerMinute } from "./utils/helpers";
import { DONE_STATE } from "./constants";
import ModeSelector from "./components/ModeSelector";

function App() {
  const { state, typingMode, wordCount, words, timeLeft, initTime, typed, errors, totalCharsTyped, restart, changeMode, changeWordCount } = useTest();
  const isDone = state === DONE_STATE;

  return (
    <>
      <Header/>
      <ModeSelector 
        timeLeft={timeLeft}
        changeMode={changeMode}
        currentMode={typingMode}
        changeWordCount={changeWordCount}
        currentWordCount={wordCount}
      />
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
          wpm={calculateWordsPerMinute(initTime, errors, totalCharsTyped)}
          charsTyped={totalCharsTyped}
          errors={errors}
          className="mt-10"
        />
      }
      <Footer />
    </>
  );
}

export default App;
