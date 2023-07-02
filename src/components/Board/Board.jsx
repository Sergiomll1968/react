import { StyledButton } from "../../components/StyledButton/StyledButton";
import './Board.css';
import { useState } from "react";

export default function Board() {

  const initialBoard = ['','','','','','','','',''];
  const [board, setBoard] = useState(initialBoard);

  const [isFirstPlayerTurn, setIsfirstPlayerTurn] = useState(true);

  const initialGameInfo = {
    message1: 'Turno de',
    message2: 'X'
  };
  const [gameInfo, setGameInfo] = useState(initialGameInfo);

  const [gameFinished, setGameFinished] = useState(false);

  function isWinner(tempBoard, player) {
    const winnerPositions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    let isWinnerPlayer = false;
    console.log(tempBoard);
    winnerPositions.forEach((winPosition) => {
      if ((tempBoard[winPosition[0]] === player) && (tempBoard[winPosition[1]] === player) && (tempBoard[winPosition[2]] === player))
        isWinnerPlayer = true;
    });
    return isWinnerPlayer;
  }

  function isBoardCompleted(tempBoard) {
    const boardCompleted = tempBoard.every(element => element !== '');
    return boardCompleted;
  }

  function onClickHandler(idx) {
    if (!gameFinished) {
      if (board[idx]) {
        alert('Casilla ocupada');
      return;
      }
      let tempBoard = board.slice();
      tempBoard[idx] = (isFirstPlayerTurn) ? 'X': 'O';
      setBoard(tempBoard);
      const winner = isWinner(tempBoard, tempBoard[idx]);
      if (isBoardCompleted(tempBoard)) {
        if (winner) {
          setGameInfo({message1: 'Gana', message2: tempBoard[idx]});
        } else {
          setGameInfo({message1: 'Empate', message2: 'No gana nadie'});
        }
        setGameFinished(true);
      } else {
        if (winner) {
          setGameInfo({message1: 'Gana', message2: tempBoard[idx]});
          setGameFinished(true);
        } else {
          setIsfirstPlayerTurn(!isFirstPlayerTurn);
          setGameInfo({message1: 'Turno de', message2: (isFirstPlayerTurn) ? 'O': 'X'});
        }
      }
    }
  }

  function onClickResetGame() {
    setBoard(initialBoard);
    setIsfirstPlayerTurn(true);
    setGameInfo(initialGameInfo);
    setGameFinished(false);
  }

  return (
    <>
      <div className="d-flex justify-content-center display-3">{gameInfo.message1}</div>
      <div className="d-flex justify-content-center display-1 text-primary">{gameInfo.message2}</div>
      <div className="d-flex justify-content-center">
        <div className="row m-2 myBoard">
          {board.map((square,idx) =>
            <StyledButton
              id={idx}
              key={idx}
              onClick={() => onClickHandler(idx)}
              // className="col-4 d-flex justify-content-center p-3 text-primary bg-success bg-gradient">
              className="col-4 d-flex justify-content-center p-3 text-primary">
              {board[idx]}
            </StyledButton>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center">
        
        { gameFinished &&

          <div className="row m-2">
            <StyledButton
              onClick={() => onClickResetGame()}
              className="d-flex justify-content-center p-3 bg-danger bg-gradient text-warning">
              Reiniciar juego
            </StyledButton>
          </div>
        }

      </div>
    </>
  );
}
