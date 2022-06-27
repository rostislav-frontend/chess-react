import { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {

  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));

  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const [clickButton, setClickButton] = useState<Boolean>(false);
  function startGame() {
      setClickButton(true)
  }

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures()
    setBoard(newBoard)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className='app'>
      <BoardComponent currentPlayer={currentPlayer} swapPlayer={swapPlayer} board={board} setBoard={setBoard} clickButton={clickButton} startGame={startGame} />
      {/* пока не нажали на кнопку старта игры не показываем инфо блок о игре */}
      {clickButton ? <div className='info-game'>
        <Timer clickButton={clickButton} restart={restart} currentPlayer={currentPlayer} />
        <LostFigures title="Белые фигуры" figures={board.lostBlackFigures} />
        <LostFigures title="Черные фигуры" figures={board.lostWhiteFigures} />
      </div> : ''}

    </div>
  );
}

export default App;
