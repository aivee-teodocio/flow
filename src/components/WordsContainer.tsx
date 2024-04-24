import Words from "./Words";
import UserTypings from "./UserTypings";


const WordsContainer = (
        { wordsGenerated, userInput } : 
        { wordsGenerated: string, userInput: string }
    ) => {
        return ( <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all text-primary-500">
            <Words words={wordsGenerated}/>
            <UserTypings 
                className="absolute inset-0"
                userInput={userInput}
                words={wordsGenerated}
            />
        </div>
    );
};

export default WordsContainer;