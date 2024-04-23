import { useState } from "react";
import useWords from "./userWords";

export type State = "start" | "run" | "finish";

const NUM_WORDS = 20; // number of words to generate in each batch

const useTest = () => {
    const [state, setState] = useState<State>("start");
    const { words, updateWords } = useWords(NUM_WORDS);

    return { state, words };
};

export default useTest;