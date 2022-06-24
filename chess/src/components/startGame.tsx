import classNames from "classnames"
import { FC, SetStateAction, useState } from "react";

interface startGameProps {
     clickButton: Boolean | null;
     startGame: () => void;
}

const StartGame: FC<startGameProps> = ({clickButton, startGame}) => {
    // реализовать выбор секунд для игры
    // const [timeGame, setTimeGame] = useState('');

    return (
        <div  className={classNames('board-start', {
            'boardStartNone': clickButton
        })} >
            <div className='startGame'>
                {/* <div><span>Введите время игры (по умолчанию 300 секунд) </span></div> */}
                    
                <button onClick={() => {
                    startGame()
                }}>Game</button>
            </div>
            
        </div>
    )

}

export default StartGame;