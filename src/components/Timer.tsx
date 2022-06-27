import { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
    currentPlayer: Player | null;
    restart : () => void;
    clickButton: Boolean | null;

}

const Timer:FC<TimerProps> = ({ currentPlayer, restart, clickButton }) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        if (clickButton) {
            timer.current = setInterval(callback, 1000)
        }
        
    }

    function decrementBlackTimer() {
        setBlackTime( prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime( prev => prev - 1)
    }
    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }
    
    return (
        <div className="timer">
            <h2>Ходит - {currentPlayer?.color === 'white' ? 'белый' : 'черный'}</h2>
            <h2>Черные: {blackTime}</h2>
            <h2>Белые: {whiteTime}</h2>

            <div className="restart">
                <button onClick={handleRestart}>Restart game</button>
            </div>
        </div>
    )
}

export default Timer;
