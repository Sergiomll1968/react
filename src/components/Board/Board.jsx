import StyledButton from '../../components/StyledButton/StyledButton.js';
import StyledModal from '../../components/StyledModal/StyledModal.js';

import './Board.css';
import { useState, useEffect } from "react";

export default function Board() {

  const initialBoard = ['','','','','','','','',''];
  const [board, setBoard] = useState(initialBoard);

  const [isFirstPlayerTurn, setIsfirstPlayerTurn] = useState(true);
  const [endWinnerPosition, setEndWinnerPosition] = useState([]);

  const initialGameInfo = {
    message1: 'Turno de',
    message2: 'X'
  };
  const [gameInfo, setGameInfo] = useState(initialGameInfo);

  const [gameFinished, setGameFinished] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState();

  useEffect(() => {
    
    if (!board.every((square) => {return square===''})) {

      const player = isFirstPlayerTurn ? 'X' : 'O';
      const winner = isWinner(player);
      
      if (isBoardCompleted(board)) {
        if (winner) {
          setGameInfo({message1: 'Gana', message2: isFirstPlayerTurn});
        } else {
          setGameInfo({message1: 'Empate', message2: 'No gana nadie'});
        }
        setGameFinished(true);
        setModalMessage('Reiniciar juego');
      } else {
        if (winner) {
          setGameInfo({message1: 'Gana', message2: isFirstPlayerTurn});
          setGameFinished(true);
          setModalMessage('Reiniciar juego');
        } else {
          setIsfirstPlayerTurn(!isFirstPlayerTurn);
          setGameInfo({message1: 'Turno de', message2: isFirstPlayerTurn ? 'O': 'X'});
        }
      }
  }
    
  }, [board]);

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

  function isWinner(player) {
    let isWinnerPlayer = false;
    winnerPositions.forEach((winPosition) => {
      if ((board[winPosition[0]] === player) && (board[winPosition[1]] === player) && (board[winPosition[2]] === player)) {
        isWinnerPlayer = true;
        const copy = [...endWinnerPosition];
        copy.push(winPosition[0]);
        copy.push(winPosition[1]);
        copy.push(winPosition[2]);
        setEndWinnerPosition([...copy]);
      }
    });
    return isWinnerPlayer;
  }

  function isBoardCompleted(board) {
    const boardCompleted = board.every(element => element !== '');
    return boardCompleted;
  }

  function onClickHandler(idx) {
    if (!gameFinished) {
      if (board[idx]) {
        setShowModal(true);
        setTimeout(() => {setShowModal(false)}, 2000);
        setModalMessage('Casilla ocupada.');
      return;
      }
      let tempBoard = [...board];
      tempBoard[idx] = (isFirstPlayerTurn) ? 'X': 'O';
      setBoard(tempBoard);
    }
  }

  function onClickModal() {
    setBoard(initialBoard);
    setIsfirstPlayerTurn(true);
    setGameInfo(initialGameInfo);
    setGameFinished(false);
    setEndWinnerPosition([]);
  }

  return (
    <>
      <div className="d-flex justify-content-center display-3">{gameInfo.message1}</div>
      <div className="d-flex justify-content-center display-1 text-primary square">{gameInfo.message2 === 'X' ? <div className="redSquare"></div> : <div className="blueCircle"></div> }</div>
      <div className="d-flex justify-content-center">
        <div className="row m-2 myBoard">
          {board.map((square,idx) =>
            <StyledButton
              id={idx}
              key={idx}
              $highlight={endWinnerPosition.includes(idx) ? '#72e9cb' : 'grey'}
              onClick={() => onClickHandler(idx)}
              className="col-4 d-flex justify-content-center p-3 text-primary"
            >
              {board[idx] === 'X' ? <div className="redSquare"></div> : board[idx] === 'O' ? <div className="blueCircle"></div> : ""}
            </StyledButton>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center">
        
        { (gameFinished || showModal) &&

              <StyledModal onClick={() => gameFinished && onClickModal()} className='d-flex align-items-center'>
                <StyledButton
                  onClick={() => gameFinished && onClickModal()}
                  className="col-4 d-flex justify-content-center align-items-center p-3"
                  $highlight='white'>
                  {modalMessage}
                </StyledButton>
              </StyledModal>

        }

      </div>
    </>
  );
}
