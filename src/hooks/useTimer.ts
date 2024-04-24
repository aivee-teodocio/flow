import { useCallback, useEffect, useRef, useState } from "react";

const useTimer = (time: number ) => {
    const [timeLeft, setTimeLeft] = useState(time);
    const intervalRef = useRef<NodeJS.Timer | null>(null);

    const startTimer = useCallback(() => {
        console.log("starting timer.");

        intervalRef.current = setInterval(() => {
            setTimeLeft(timeLeft => timeLeft - 1);
        }, 1000);
    }, [setTimeLeft]);

    const resetTimer = useCallback(() => {
        console.log("resetting timer.");

        if(intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setTimeLeft(time);
    }, [time]);

    useEffect(() => {
        if(!timeLeft && intervalRef.current) {
            console.log("resetting timer.");
            clearInterval(intervalRef.current);
        }
    }, [timeLeft, intervalRef]);

    return { timeLeft, startTimer, resetTimer };
};

export default useTimer;