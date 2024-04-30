import allWords from "../assets/words";

const formatPercentage = (percentage: number) => {
    return percentage.toFixed(0) + '%';
}

const countErrors = (actual: string, expected: string) => {
    const expectedCharacters = expected.split("");

    return expectedCharacters.reduce((errors, expectedChar, index) => {
        const currChar = actual[index];
        if(currChar !== expectedChar) {
            errors++;
        }
        return errors;
    }, 0);
}

const calculateAccuracy = (totalErrors: number, totalCharsTyped: number) => {
    if(totalCharsTyped > 0) {
        const totalCorrect = totalCharsTyped - totalErrors;
        return (totalCorrect / totalCharsTyped) * 100;
    }
    return 0;
}

const calculateWordsPerMinute = (timeSecs: number, totalErrors: number, totalCharsTyped: number) => {
    if(totalCharsTyped > 0) {
        const totalCorrect = totalCharsTyped - totalErrors;
        const timeMins = timeSecs / 60;
        return Math.floor((totalCorrect / 5) / timeMins);
    }
    return 0;
}

const generateWords = (numWords: number) => {
    let wordsList = "";
    let count = 0;

    if(numWords > 0) {
        while(count < numWords) {
            const nextWord = allWords[Math.floor(Math.random() * allWords.length)];
            wordsList += nextWord.toLowerCase();
            if(count < numWords - 1)
                wordsList += " ";
            count++;
        }
    }

    return wordsList;
}

export {
    formatPercentage,
    countErrors,
    calculateAccuracy,
    calculateWordsPerMinute,
    generateWords
}