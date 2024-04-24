import { useCallback, useEffect, useRef, useState } from "react";

const isKeyValid = (keyCode: string) => {
    return ( 
        keyCode.startsWith("Key") ||
        keyCode.startsWith("Backspace") ||
        keyCode === "Backspace" ||
        keyCode === "Space" 
    );
};

const useTypings = (enabled: boolean) => {
    const [cursor, setCursor] = useState(0);
    const [typed, setTyped] = useState<string>("");
    const totalCharsTyped = useRef(0);

    const clearTyped = useCallback(() => {
        setTyped("");
        setCursor(0);
    }, []);

    const resettotalCharsTyped = useCallback(() => {
        totalCharsTyped.current = 0;
    }, []);

    const keydownHandler = useCallback(({ key, code }: KeyboardEvent) => {
        if (!isKeyValid(code) || !enabled) {
            return;
        }

        switch(key) {
            case "Backspace":
                setTyped(prev => prev.slice(0, -1));
                setCursor(cursor - 1);
                totalCharsTyped.current--;
                break;
            default:
                setTyped(prev => prev.concat(key));
                setCursor(cursor + 1);
                totalCharsTyped.current++;
        }
    }, [cursor, enabled]);

    useEffect(() => {
        window.addEventListener("keydown", keydownHandler);
    
        return () => { // remove listeners on cleanup
            window.removeEventListener("keydown", keydownHandler);
        };
    }, [keydownHandler]);

    return {
        typed,
        cursor,
        clearTyped,
        resettotalCharsTyped,
        totalCharsTyped: totalCharsTyped.current
    }
};

export default useTypings;