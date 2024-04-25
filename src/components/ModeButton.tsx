import { useRef } from "react";

const ModeButton = ({ className, text, onClick } : {className?: string, text: string, onClick: () => void}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    return (
        <button 
            ref={buttonRef} 
            className={className} 
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ModeButton;