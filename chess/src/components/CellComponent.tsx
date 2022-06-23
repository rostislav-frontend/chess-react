import classNames from "classnames";
import { FC } from "react";
import { Cell } from "../models/Cell";


interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}
const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return(
        <div 
        className={classNames('cell', cell.color, selected ? 'selected' : '')} 
        style={{background: cell.available && cell.figure ? 'green' : ''}} 
        onClick={() => click(cell)} >
            {cell.available && !cell.figure && <div className={classNames('available')} />}
            {cell.figure?.logo && <img src={cell.figure.logo} alt=''></img>}
        </div>
    )
}

export default CellComponent;


