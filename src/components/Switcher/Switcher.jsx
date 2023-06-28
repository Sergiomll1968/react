import './Switcher.css';

function Switcher({ calcOff, onClickStateHandler }) {
  return (  
    <div className="switch-button"> 
      <input type="checkbox" className="switch-button switch-button__checkbox" id="switch-label" onClick={ onClickStateHandler } checked={calcOff}></input>
      <label htmlFor="switch-label" className="switch-button__label"></label>
    </div>
    )
}

export default Switcher;
