import { useState } from "react";
import useWords from "./useWords";
import useTimer from "./useTimer";

export type State = "start" | "run" | "finish";

const NUM_WORDS = 20; // number of words to generate in each batch
const TIMER_SECS = 30;

const useTest = () => {
    const [state, setState] = useState<State>("start");
    const { words, updateWords } = useWords(NUM_WORDS);
    const { timeLeft, startTimer, resetTimer } = useTimer(TIMER_SECS);
    

    return { state, words, timeLeft };
};

export default useTest;