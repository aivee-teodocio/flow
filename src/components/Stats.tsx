import { motion } from "framer-motion";

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
                Accuracy: {accuracy}%
            </motion.li>
            <motion.li 
                className="text-red-600"
                initial={init}
                animate={animate}
                transition={({...duration, delay: 1})}
            >
                Errors: {errors}
            </motion.li>
            <motion.li 
                initial={init}
                animate={animate}
                transition={({...duration, delay: 1.5})}
            >
                Words Typed: {wordsTyped}
            </motion.li>
        </motion.ul>
    );
};

export default Stats;