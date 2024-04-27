import TypingCursor from "./TypingCursor";
import cn from "classnames";

const UserTypings = ({
    userInput,
    className,
    words
} : {
    userInput: string,
    className?: string,
    words: string
}) => {
    const typedChars = userInput.split("");

    return (
        <div className={className}>
            {
                typedChars.map((char, index) => {
                    return (
                        <Character 
                            key={`${char}-${index}`}
                            actual={char}
                            expected={words[index]}
                        />
                    );
                })
            }
            <TypingCursor/>
        </div>
    )
};

const Character = (
    { actual, expected }: 
    { actual: string, expected: string }
) => {
    const isSpace = expected === " ";
    const isRight = actual === expected;

    const className = cn({
        "text-primary-400": !isSpace && isRight,
        "text-error-600": !isSpace && !isRight,
        "bg-error-500/50": isSpace && !isRight
    });

    return <span className={className}>{expected}</span>;
};

export default UserTypings;