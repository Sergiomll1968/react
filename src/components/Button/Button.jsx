import './Button.css';

function Button({ id, className, onClickHandler, children, disabled }) {
  // console.log(disabled)
  return (
    <>
      <button id={ id } onClick={ onClickHandler } className={ className } disabled={ disabled }>{ children }</button>
    </>
  );
}

export default Button;
