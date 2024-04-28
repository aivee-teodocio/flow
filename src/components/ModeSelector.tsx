import { TypingMode } from "../hooks/useTypingTest";
import Timer from "./Timer";
import { TIMER_MODE, WORDS_MODE } from "../constants";
import ModeButton from "./ModeButton";
import WordsModeOptions from "./WordsModeOptions";

const ModeSelector = ({
    timeLeft,
    currentMode,
    currentWordCount,
    changeMode,
    changeWordCount
} : {
    timeLeft: number,
    currentMode: string;
    currentWordCount: number;
    changeMode: (newMode: TypingMode) => void;
    changeWordCount: (newWordCount: number) => void;
}) => {
    const underlineStyle = "underline underline-offset-4";
    const isTimerMode = currentMode === TIMER_MODE;

    const changeToWordsMode = () => {
        changeMode(WORDS_MODE);
    }

    const changeToTimerMode = () => {
        changeMode(TIMER_MODE);
    }

    return (
        <div className="flex justify-between text-primary-400 text-lg font-semibold">
            { 
                isTimerMode ? 
                    <Timer timeLeft={timeLeft} /> :
                    <WordsModeOptions
                        currentWordCount={currentWordCount}
                        changeWordCount={changeWordCount}
                    ></WordsModeOptions>
            }
            <div>
                <span className="mr-2">Mode:</span>
                <ModeButton 
                    className={isTimerMode ? underlineStyle : ""}
                    text="Timer"
                    onClick={changeToTimerMode}
                ></ModeButton>
                <span className="mx-1"> / </span>
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