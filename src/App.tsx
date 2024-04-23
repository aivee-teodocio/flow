import Words from "./components/Words";
import Timer from "./components/Timer";
import RedoButton from "./components/RedoButton";

const INIT_TIME_SECONDS = 30;

function App() {
  return (
    <>
      <Timer timeLeft={INIT_TIME_SECONDS}/>
      <Words />
      <RedoButton 
        onRestart={() => {}}
        className={"mx-auto mt-10 text-slate-500"}
      />
    </>
  );
}

export default App;
