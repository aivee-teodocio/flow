import { WORD_MODE_OPTIONS } from "../constants";
import ModeButton from "./ModeButton";

const WordsModeOptions = ({
    currentWordCount,
    changeWordCount
}: {
    currentWordCount: number,
    changeWordCount: (newWordCount: number) => void;
}) => {
    const options = WORD_MODE_OPTIONS;
    const underlineStyle = "underline underline-offset-4";

    return (
        <div>
            <span className="mr-2">Words:</span>
            {
                options.map((wordCount, index) => {
                    return (
                        <>
                            <ModeButton
                                key={`${wordCount}-${index}`}
                                className={wordCount === currentWordCount ? underlineStyle : ""}
                                text={`${wordCount}`}
                                onClick={() => changeWordCount(wordCount)}
                            />
                            { 
                                (index < options.length - 1) && 
                                <span className="mx-1"> / </span> 
                            }
                        </>
                    )
                })
            }
        </div>
    );
};

export default WordsModeOptions;