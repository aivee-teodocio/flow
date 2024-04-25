import { TypingMode } from "../hooks/useTest";
import Timer from "./Timer";
import { TIMER_MODE, WORDS_MODE } from "../constants";
import ModeButton from "./ModeButton";

const ModeSelector = ({
    timeLeft,
    changeMode,
    currentMode
} : {
    timeLeft: number,
    changeMode: (newMode: TypingMode) => void;
    currentMode: string;
}) => {

    const changeToWordsMode = () => {
        changeMode(WORDS_MODE);
    }

    const changeToTimerMode = () => {
        changeMode(TIMER_MODE);
    }
    const underlineStyle = "underline underline-offset-4";
    const isTimerMode = currentMode === TIMER_MODE;

    return (
        <div className="flex justify-between">
            <Timer timeLeft={timeLeft} />
            
            <div className="text-primary-400 text-lg flex justify-between">
                <span className="mr-2">Mode:</span>
                <ModeButton 
                    className={isTimerMode ? underlineStyle : ""}
                    text="Timer"
                    onClick={changeToTimerMode}
                ></ModeButton>
                <text className="mx-2"> / </text>
                <ModeButton 
                    className={isTimerMode ? "" : underlineStyle}
                    text="Words"
                    onClick={changeToWordsMode}
                ></ModeButton>
            </div>
        </div>
    );
};

export default ModeSelector;