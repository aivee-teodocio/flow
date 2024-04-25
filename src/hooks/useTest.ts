import { useCallback, useState, useEffect } from "react";
import useWords from "./useWords";
import useTimer from "./useTimer";
import useTypings from "./useTypings";
import { countErrors } from "../utils/helpers";
import { START_STATE, RUN_STATE, DONE_STATE } from "../constants";

export type State = typeof START_STATE | typeof RUN_STATE | typeof DONE_STATE;

const NUM_WORDS = 20; // number of words to generate in each batch
const INIT_TIME_SECS = 30;

const useTest = () => {
    const [state, setState] = useState<State>(START_STATE);
    const { words, updateWords } = useWords(NUM_WORDS);
    const { timeLeft, startTimer, resetTimer } = useTimer(INIT_TIME_SECS);
    const { typed, cursor, clearTyped, resettotalCharsTyped, totalCharsTyped } = useTypings(state !== DONE_STATE);
    const [errors, setErrors] = useState(0);
    const isStarting = state === START_STATE && cursor > 0;
    const areAllWordsTyped = cursor === words.length;

    const calculateErrors = useCallback(() => {
        const wordsReached = words.substring(0, cursor);
        setErrors(prevErrors => prevErrors + countErrors(typed, wordsReached));
    }, [typed, words, cursor]);

    useEffect(() => {
        if(isStarting) {
            setState(RUN_STATE);
            startTimer();
        }
    }, [isStarting, startTimer, cursor]);
    
    useEffect(() => {
        if(!timeLeft) {
            setState(DONE_STATE);
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
        setState(START_STATE);
        setErrors(0);
        updateWords();
        clearTyped();
    }, [clearTyped, updateWords, resetTimer, resettotalCharsTyped]);

    return { 
        state, 
        words, 
        timeLeft, 
        initTime: INIT_TIME_SECS, 
        typed, 
        errors, 
        totalCharsTyped, 
        restart 
    };
};

export default useTest;