import './Calc.css';
import { useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import Switcher from '../../components/Switcher/Switcher.jsx';

function Calc() {

  const initialState = {
    calcOff: true,
    operationInProgress: '0',
    init: true,
    numberPermitted: true,
    operatorPermitted: false
  };

  const [displayer,setDisplayer] = useState(initialState);
  const [disabled, setDisabled] = useState(false);

  let newDisplayer;


  function onClickHandler(element, typeOfElement) {
    if (displayer.init) {
      if (typeOfElement === 'number') {
          setDisplayer({...displayer, init: false, operatorPermitted: true, operationInProgress: element});
      }
    } else {

      switch (element) {
        case 'C':
          setDisplayer({...initialState,calcOff: false});
          setDisabled(false);
          break;
        case 'B':
          (displayer.operationInProgress.length === 1) ?
            newDisplayer = '0' :
            newDisplayer = displayer.operationInProgress.substring(0, displayer.operationInProgress.length - 1);
          setDisplayer({...displayer, operationInProgress: `${newDisplayer}`});
          break;
        case '=':
          setDisplayer({...displayer, operationInProgress: eval(displayer.operationInProgress)});
          setDisabled(true);
          break;
        default:
          if (typeOfElement === 'number') {
            setDisplayer({...displayer, operatorPermitted: true, operationInProgress: `${displayer.operationInProgress}${element}`});
          } else {
            if (displayer.operatorPermitted) setDisplayer({...displayer, operatorPermitted: false, operationInProgress: `${displayer.operationInProgress}${element}`});
          }
          break;
      }
    }
  }

  return (
    <>

      <h1>Calculadora</h1>
      <br />
      <Switcher calcOff={setDisplayer.calcOff} onClickStateHandler={ () => setDisplayer({...displayer, calcOff: !displayer.calcOff}) } ></Switcher>
      <br />
      <br />

      
      {
        !displayer.calcOff &&

        <div className='container'>
        <div className='calc-body'>
          <div className='calc-screen'>
            <div className='calc-operation'>{displayer.operationInProgress}</div>
            </div>
            <div className='calc-button-row'>
            <Button id="buttonC" className='button c' onClickHandler={ () => onClickHandler('C','operator') }>C</Button>
            <Button id="button/" className='button o' onClickHandler={ () => onClickHandler('/','operator') } disabled={ disabled }>/</Button>
            </div>
            <div className='calc-button-row'>
            <Button id="button7" className='button' onClickHandler={ () => onClickHandler('7','number') } disabled={ disabled }>7</Button>
            <Button id="button8" className='button' onClickHandler={ () => onClickHandler('8','number') } disabled={ disabled }>8</Button>
            <Button id="button9" className='button' onClickHandler={ () => onClickHandler('9','number') } disabled={ disabled }>9</Button>
            <Button id="button*" className='button o' onClickHandler={ () => onClickHandler('*','operator') } disabled={ disabled }>*</Button>
            </div>
            <div className='calc-button-row'>
            <Button id="button4" className='button' onClickHandler={ () => onClickHandler('4','number') } disabled={ disabled }>4</Button>
            <Button id="button5" className='button' onClickHandler={ () => onClickHandler('5','number') } disabled={ disabled }>5</Button>
            <Button id="button6" className='button' onClickHandler={ () => onClickHandler('6','number') } disabled={ disabled }>6</Button>
            <Button id="button-" className='button o' onClickHandler={ () => onClickHandler('-','operator') } disabled={ disabled }>-</Button>
            </div>
            <div className='calc-button-row'>
            <Button id="button1" className='button' onClickHandler={ () => onClickHandler('1','number') } disabled={ disabled }>1</Button>
            <Button id="button2" className='button' onClickHandler={ () => onClickHandler('2','number') } disabled={ disabled }>2</Button>
            <Button id="button3" className='button' onClickHandler={ () => onClickHandler('3','number') } disabled={ disabled }>3</Button>
            <Button id="button+" className='button o' onClickHandler={ () => onClickHandler('+','operator') } disabled={ disabled }>+</Button>
            </div>
            <div className='calc-button-row'>
            <Button id="button." className='button' onClickHandler={ () => onClickHandler('.','number') } disabled={ disabled }>.</Button>
            <Button id="button0" className='button' onClickHandler={ () => onClickHandler('0','number') } disabled={ disabled }>0</Button>
            <Button id="buttonB" className='button b' onClickHandler={ () => onClickHandler('B','operator') } disabled={ disabled }>B</Button>
            <Button id="button=" className='button o' onClickHandler={ () => onClickHandler('=','operator') } disabled={ disabled }>=</Button>
            </div>
            </div>
            </div>
      }

        
      
    
    </>
  );

}

export default Calc;
