import classNames from "classnames";
import React, { FC, useState } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";


interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
    const [click, setClick] = useState<Boolean>(false)
    function startGameNone() {
        setClick(true)
    }
    return (
        <div className="boardWrapper">
            <div  className={classNames('board-start', {
                'boardStartNone': click
            })} >
                <button onClick={startGameNone}>Game</button>
            </div>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent cell={cell} key={cell.id} />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>

    )
}

export default BoardComponent;


