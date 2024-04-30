import { faker } from "@faker-js/faker";
import { useCallback, useState } from "react";
import { DEFAULT_WORD_COUNT } from "../constants";

const generateWords = (count: number) => {
    return faker.word.words(count).toLowerCase();
}

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