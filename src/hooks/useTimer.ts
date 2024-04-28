import { useCallback, useEffect, useRef, useState } from "react";

const useTimer = (initTime: number, isTimerMode: boolean, areAllWordsTyped: boolean) => {
    const [time, setTime] = useState(initTime);
    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const startTimer = useCallback(() => {
        intervalRef.current = setInterval(() => {
            if (isTimerMode) { // if in timer mode, calculate time left
                setTime(time => time - 1);
            } else { //if in words mode, calculcate time elapsed
                setTime(time => time + 1);
            }
        }, 1000);
    }, [isTimerMode]);

    const resetTimer = useCallback(() => {
        if(intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setTime(initTime); // bring timer back to set initial value
    }, [initTime, setTime]);

    useEffect(() => {
        if(((isTimerMode && !time) || (!isTimerMode && areAllWordsTyped)) && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [time, isTimerMode, areAllWordsTyped, intervalRef]);

    return { time, startTimer, resetTimer };
};

export default useTimer;