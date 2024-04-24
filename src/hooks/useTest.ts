import { useCallback, useState, useEffect } from "react";
import useWords from "./useWords";
import useTimer from "./useTimer";
import useTypings from "./useTypings";
import { countErrors } from "../utils/helpers";

export type State = "start" | "run" | "done";

const NUM_WORDS = 20; // number of words to generate in each batch
const TIMER_SECS = 30;

const useTest = () => {
    const [state, setState] = useState<State>("start");
    const { words, updateWords } = useWords(NUM_WORDS);
    const { timeLeft, startTimer, resetTimer } = useTimer(TIMER_SECS);
    const { typed, cursor, clearTyped, resettotalCharsTyped, totalCharsTyped } = useTypings(state !== "done");
    const [errors, setErrors] = useState(0);
    const isStarting = state === "start" && cursor > 0;
    const areAllWordsTyped = cursor === words.length;

    const calculateErrors = useCallback(() => {
        const wordsReached = words.substring(0, cursor);
        setErrors(prevErrors => prevErrors + countErrors(typed, wordsReached));
    }, [typed, words, cursor]);

    useEffect(() => {
        if(isStarting) {
            setState("run");
            startTimer();
        }
    }, [isStarting, startTimer, cursor]);
    
    useEffect(() => {
        if(!timeLeft) {
            setState("done");
            calculateErrors();
        }
    }, [timeLeft, calculateErrors]);

    useEffect(() => {
        if(areAllWordsTyped) {
            calculateErrors();
            updateWords();
            clearTyped();
        }
    }, [
        cursor,
        words,
        clearTyped,
        typed,
        areAllWordsTyped,
        updateWords,
        calculateErrors
    ])

    const restart = useCallback (() => {
        resetTimer();
        resettotalCharsTyped();
        setState("start");
        setErrors(0);
        updateWords();
        clearTyped();
    }, [clearTyped, updateWords, resetTimer, resettotalCharsTyped]);

    return { state, words, timeLeft, typed, errors, totalCharsTyped, restart };
};

export default useTest;