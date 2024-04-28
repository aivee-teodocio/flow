import { useCallback, useState, useEffect } from "react";
import useWords from "./useWords";
import useTimer from "./useTimer";
import useTypings from "./useTypings";
import { countErrors } from "../utils/helpers";
import { START_STATE, RUN_STATE, DONE_STATE, WORDS_MODE, TIMER_MODE } from "../constants";

export type State = typeof START_STATE | typeof RUN_STATE | typeof DONE_STATE;
export type TypingMode = typeof WORDS_MODE | typeof TIMER_MODE;

const INIT_TIME_SECS = 30;
const DEFAULT_WORD_COUNT = 25;

const useTypingTest = () => {
    const [state, setState] = useState<State>(START_STATE);
    const [typingMode, setTypingMode] = useState<TypingMode>(TIMER_MODE);
    const [wordCount, setWordCount] = useState(DEFAULT_WORD_COUNT);
    const [initTime, setInitTime] = useState(INIT_TIME_SECS);
    const {words, updateWords} = useWords(wordCount);
    const isTimerMode = typingMode === TIMER_MODE;
    const {typed, cursor, clearTyped, resetTotalCharsTyped, totalCharsTyped} = useTypings(state !== DONE_STATE);
    const [errors, setErrors] = useState(0);
    const isStarting = state === START_STATE && cursor > 0;
    const areAllWordsTyped = cursor === words.length;
    const {time, startTimer, resetTimer} = useTimer(initTime, typingMode === TIMER_MODE, areAllWordsTyped);

    const calculateErrors = useCallback(() => {
        const wordsReached = words.substring(0, cursor);
        setErrors(prevErrors => prevErrors + countErrors(typed, wordsReached));
    }, [typed, words, cursor]);

    useEffect(() => {
        if(isStarting) {
            setState(RUN_STATE);
            startTimer();
        }
    }, [isStarting, cursor, startTimer]);

    // set state to done when time = 0 in timer mode, or when all words
    // have been typed in words mode
    useEffect(() => {
            if((isTimerMode && !time) 
                || (!isTimerMode && areAllWordsTyped)) {
                setState(DONE_STATE);
                calculateErrors();
            }
    }, [time, isTimerMode, areAllWordsTyped, typingMode, calculateErrors]);

    useEffect(() => { // generate new words (for time mode)
        if(isTimerMode && areAllWordsTyped) {
            calculateErrors();
            updateWords();
            clearTyped();
        }
    }, [
        cursor,
        isTimerMode,
        words,
        clearTyped,
        typed,
        areAllWordsTyped,
        updateWords,
        calculateErrors
    ]);

    const restart = useCallback (() => {
        resetTimer();
        resetTotalCharsTyped();
        setState(START_STATE);
        setErrors(0);
        updateWords();
        clearTyped();
    }, [clearTyped, updateWords, resetTimer, resetTotalCharsTyped]);

    const changeMode = useCallback((newMode: TypingMode) => {
        setTypingMode(newMode);
        setInitTime(isTimerMode ? INIT_TIME_SECS : 0);
        resetTimer();
        resetTotalCharsTyped();
        setState(START_STATE);
        setErrors(0);
        clearTyped();
        updateWords();
        
    }, [isTimerMode, resetTimer, clearTyped, resetTotalCharsTyped, updateWords]);

    useEffect(() => {
        if(isTimerMode) {
            setInitTime(INIT_TIME_SECS);
        } else {
            setInitTime(0);
        }
        resetTimer();
        resetTotalCharsTyped();
        setState(START_STATE);
        setErrors(0);
        clearTyped();
        updateWords();
    }, [
        isTimerMode,
        clearTyped,
        typingMode,
        updateWords,
        setErrors,
        resetTimer,
        resetTotalCharsTyped
    ])

    const changeWordCount = useCallback((newWordCount: number) => {
        setInitTime(isTimerMode ? INIT_TIME_SECS : 0);
        resetTimer();
        resetTotalCharsTyped();
        setState(START_STATE);
        setErrors(0);
        clearTyped();
        setWordCount(newWordCount)
    }, [isTimerMode, clearTyped, resetTimer, resetTotalCharsTyped])

    return { 
        state,
        typingMode,
        wordCount,
        words, 
        time, 
        initTime, 
        typed, 
        errors, 
        totalCharsTyped,
        restart,
        changeMode,
        changeWordCount
    };
};

export default useTypingTest;