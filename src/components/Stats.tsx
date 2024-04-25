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

    return (
        <motion.ul
            className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
        >
            <motion.li 
                className="text-xl font-bold"
                initial={init}
                animate={animate}
                transition={({...duration, delay: 0})}
            >
                Results
            </motion.li>
            <motion.li 
                initial={init}
                animate={animate}
                transition={({...duration, delay: 0.5})}
            >
                Accuracy: {formatPercentage(accuracy)}
            </motion.li>
            <motion.li 
                initial={init}
                animate={animate}
                transition={({...duration, delay: 1})}
            >
                WPM: {wpm}
            </motion.li>
            <motion.li 
                className="text-red-600"
                initial={init}
                animate={animate}
                transition={({...duration, delay: 1.5})}
            >
                Errors: {errors}
            </motion.li>
            <motion.li 
                initial={init}
                animate={animate}
                transition={({...duration, delay: 2})}
            >
                Characters Typed: {charsTyped}
            </motion.li>
        </motion.ul>
    );
};

export default Stats;