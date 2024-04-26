import { useCallback, useState, useEffect } from "react";
import useWords from "./useWords";
import useTimer from "./useTimer";
import useTypings from "./useTypings";
import { countErrors } from "../utils/helpers";
import { START_STATE, RUN_STATE, DONE_STATE, WORDS_MODE, TIMER_MODE, WORD_MODE_OPTIONS } from "../constants";

export type State = typeof START_STATE | typeof RUN_STATE | typeof DONE_STATE;
export type TypingMode = typeof WORDS_MODE | typeof TIMER_MODE;

const INIT_TIME_SECS = 30;
const DEFAULT_WORD_COUNT = 25;

const useTest = () => {
    const [state, setState] = useState<State>(START_STATE);
    const [typingMode, setTypingMode] = useState<TypingMode>(TIMER_MODE);
    const [wordCount, setWordCount] = useState(DEFAULT_WORD_COUNT);
    const { words, updateWords } = useWords(wordCount);
    const { timeLeft, startTimer, resetTimer } = useTimer(INIT_TIME_SECS);
    const { typed, cursor, clearTyped, resettotalCharsTyped: resetTotalCharsTyped, totalCharsTyped } = useTypings(state !== DONE_STATE);
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
        resetTotalCharsTyped();
        setState(START_STATE);
        setErrors(0);
        updateWords();
        clearTyped();
    }, [clearTyped, updateWords, resetTimer, resetTotalCharsTyped]);


    /*
        NOTE TO SELF:
            - accuracy calculation is only possible in timer mode
            - timer should not matter in words mode
            - in words mode, results should show up after user reaches last word 
    */

    const changeMode = useCallback((newMode: TypingMode) => {
        resetTimer();
        resetTotalCharsTyped();
        setState(START_STATE);
        setErrors(0);
        clearTyped();
        setTypingMode(newMode);
        updateWords();
    }, [resetTimer, clearTyped, resetTotalCharsTyped, updateWords]);

    const changeWordCount = useCallback((newWordCount: number) => {
        resetTimer();
        resetTotalCharsTyped();
        setState(START_STATE);
        setErrors(0);
        clearTyped();
        setWordCount(newWordCount);
        updateWords();
    }, [clearTyped, resetTimer, resetTotalCharsTyped, updateWords])

    console.log(wordCount);

    return { 
        state,
        typingMode,
        wordCount,
        words, 
        timeLeft, 
        initTime: INIT_TIME_SECS, 
        typed, 
        errors, 
        totalCharsTyped,
        restart,
        changeMode,
        changeWordCount
    };
};

export default useTest;