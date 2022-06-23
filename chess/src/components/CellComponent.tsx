import classNames from "classnames";
import { FC } from "react";
import { Cell } from "../models/Cell";


interface CellProps {
    cell: Cell
}
const CellComponent: FC<CellProps> = ({cell}) => {
    return(
        <div className={classNames('cell', cell.color)}>
            {cell.figure?.logo && <img src={cell.figure.logo} alt=''></img>}
        </div>
    )
}

export default CellComponent;


