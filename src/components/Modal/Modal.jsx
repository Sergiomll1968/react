import './Modal.css';
import StyledButton from '../../components/StyledButton/StyledButton.jsx';

function Modal({resetGame}) {
  return (
    <>
      <div
        className='layer d-flex align-items-center'
        onClick={() => resetGame()}
      >
        <StyledButton
          onClick={() => resetGame()}
          className="col-4 d-flex justify-content-center align-items-center p-3"
          $highlight='white'>
          Reiniciar juego
        </StyledButton>
      </div>
    </>
  );
}

export default Modal;
