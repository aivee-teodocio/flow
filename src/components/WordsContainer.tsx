import Words from "./Words";
import UserTypings from "./UserTypings";


const WordsContainer = ({ wordsGenerated } : { wordsGenerated: string }) => {
    return ( <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all">
        <Words words={wordsGenerated}/>
        <UserTypings className="absolute inset-0" userInput={wordsGenerated}></UserTypings>
    </div>
    );
};

export default WordsContainer;