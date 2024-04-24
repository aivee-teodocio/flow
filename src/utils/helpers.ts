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

const calculateAccuracy = (errors: number, totalTyped: number) => {
    if(totalTyped > 0) {
        const amountCorrect = totalTyped - errors;
        return (amountCorrect / totalTyped) * 100;
    }
    return 0;
}

export {
    formatPercentage,
    countErrors,
    calculateAccuracy
}