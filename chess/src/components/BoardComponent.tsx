import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponent";


interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {

    // Выбранная ячейка
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null)
        } else {
            setSelectedCell(cell)
        }
    }

    function highLightCells() {
        board.highLightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);

    }
    useEffect(() => {
        highLightCells()
    }, [selectedCell])


    const [clickButton, setClickButton] = useState<Boolean>(true);
    function startGame() {
        setClickButton(true)
    }
    return (
        <div className="boardWrapper">
            <div  className={classNames('board-start', {
                'boardStartNone': clickButton
            })} >
                <button onClick={startGame}>Game</button>
            </div>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellComponent click={click} selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} cell={cell} key={cell.id} />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>

    )
}

export default BoardComponent;


