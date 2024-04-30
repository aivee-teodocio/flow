import { useEffect, useRef, useCallback } from "react";
import { MdRefresh } from "react-icons/md";

const RedoButton = ({
    onRestart: handleRestart,
    className = "",
}: {
    onRestart: () => void;
    className?: string;
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        buttonRef.current?.blur(); // remove focus from button after it is clicked
        handleRestart();
    };

    return (
        <button
            ref={buttonRef}
            onClick={handleClick}
            className={`block rounded px-8 py-2 bg-slate-800 hover:bg-slate-900 ${className}`}
        >
            <MdRefresh className="w-6 h-6"/>
        </button>
    );
};

export default RedoButton;