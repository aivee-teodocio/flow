const Stats = ({
    accuracy,
    wordsTyped,
    className,
    errors
}: {
    accuracy: number;
    wordsTyped: number;
    className?: string;
    errors: number;
}) => {
    return (
        <ul
            className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
        >
            <li className="text-xl font-bold">Results</li>
            <li>Accuracy: {accuracy}%</li>
            <li className="text-red-600">Errors: {errors}</li>
            <li>Words Typed: {wordsTyped}</li>
        </ul>
    );
};

export default Stats;