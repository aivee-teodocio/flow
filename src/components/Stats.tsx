import { motion } from "framer-motion";
import { formatPercentage } from "./../utils/helpers";

const Stats = ({
    accuracy,
    wpm,
    charsTyped,
    className,
    errors
}: {
    accuracy: number;
    wpm: number;
    charsTyped: number;
    className?: string;
    errors: number;
}) => {
    const init = { opacity: 0 };
    const animate = { opacity: 1 };
    const duration = { duration: 0.3 };

    const delayIncrement = 0.5;
    let currDelay = 0;

    const stats = [
        { label: "WPM", val: wpm },
        { label: "Accuracy", val: formatPercentage(accuracy) },
        { label: "Errors", val: errors },
        { label: "Characters Typed", val: charsTyped }
    ];

    return (
        <motion.ul
            className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
        >
            <motion.li 
                className="text-xl font-bold"
                initial={init}
                animate={animate}
                transition={({...duration, delay: currDelay})}
            >
                Results
            </motion.li>
            {
                stats.map(({label, val}, index) => {
                    currDelay += delayIncrement; 
                    return (
                        <motion.li
                            initial={init}
                            animate={animate}
                            transition={({...duration, delay: currDelay})}
                        >
                            {`${label}: ${val}`}
                        </motion.li>
                    );
                })
            }
        </motion.ul>
    );
};

export default Stats;