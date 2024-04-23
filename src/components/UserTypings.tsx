const UserTypings = ({
    userInput,
    className,
} : {
    userInput: string,
    className?: string
}) => {
    const typedChars = userInput.split("");

    return (
        <div className={className}>
            {
                typedChars.map((char, index) => {
                    return <Character key={`${char}-${index}`} char={char}></Character>;
                })
            }
        </div>
    )
};

const Character = ({ char } : { char: string }) => {
    return <span className="text-primary-300">{char}</span>;
};

export default UserTypings;