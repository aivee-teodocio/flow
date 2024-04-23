import Timer from "./components/Timer";
import RedoButton from "./components/RedoButton";
import Stats from "./components/Stats";
import { faker } from "@faker-js/faker";
import WordsContainer from "./components/WordsContainer";
import useTest from "./hooks/useTest";

const INIT_TIME_SECONDS = 30;
const wordsGenerated = faker.word.words(20);

function App() {
  const { state, words } = useTest();

  return (
    <>
      <Timer timeLeft={INIT_TIME_SECONDS}/>
      <WordsContainer wordsGenerated={wordsGenerated} />
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
