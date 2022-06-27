
import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";
import StartGame from "./startGame";


interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
    startGame: () => void;
    clickButton: Boolean | null;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer, startGame, clickButton }) => {

    // Выбранная ячейка
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer()
            setSelectedCell(null)
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }

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



    return (
        <div className="boardWrapper">
            <StartGame clickButton={clickButton}  startGame={startGame} />
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


