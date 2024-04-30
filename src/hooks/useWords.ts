import { useCallback, useState } from "react";
import { DEFAULT_WORD_COUNT } from "../constants";
import { generateWords } from "../utils/helpers";

const useWords = () => {
    const [wordCount, setWordCount] = useState(DEFAULT_WORD_COUNT);
    const [words, setWords] = useState<string>(generateWords(wordCount));

    const updateWords = useCallback(() => {
        setWords(generateWords(wordCount));
    }, [wordCount]);

    const updateWordCount = useCallback((newCount: number) => {
        setWordCount(newCount);
    }, []);

    return { wordCount, words, updateWordCount, updateWords };
};

export default useWords;