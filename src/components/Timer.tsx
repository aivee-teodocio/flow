const Timer = ({ timeLeft }: { timeLeft: number}) => {
    return <h2 className="text-primary-400 text-lg font-semibold">Time: {timeLeft}</h2>;
}

export default Timer;