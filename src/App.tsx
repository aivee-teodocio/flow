import Words from "./components/Words";
import Timer from "./components/Timer";
import RedoButton from "./components/RedoButton";
import Stats from "./components/Stats";
import UserTypings from "./components/UserTypings";
import { faker } from "@faker-js/faker";

const INIT_TIME_SECONDS = 30;
const wordsGenerated = faker.word.words(20);

function App() {
  return (
    <>
      <Timer timeLeft={INIT_TIME_SECONDS}/>
      <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all">
        <Words words={wordsGenerated}/>
        <UserTypings className="absolute inset-0" userInput={wordsGenerated}></UserTypings>
      </div>
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
