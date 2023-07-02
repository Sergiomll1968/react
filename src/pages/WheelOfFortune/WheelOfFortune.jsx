import './WheelOfFortune.css';
import { useState, useEffect } from 'react';
import logo from '../../images/logo.png';


function WheelOfFortune() {
  
  const scores = [10,20,50,100,200,500];
  
  const [film,setFilm] = useState('');
  const [isSolutionState, setIsSolutionState] = useState(true);
  const [inputTextPlaceholder,setInputTextPlaceholder] = useState('Escribe solución');
  const [inputTextDisabled, setInputTextDisabled] = useState(false);
  const [wordInProgress, setWordInProgress] = useState('');
  const [randomPoints, setRandomPoints] = useState(0);
  const [score, setScore] = useState(0);
  const [randomButtonDisabled, setRandomButtonDisabled] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [errorsLeft, setErrorsLeft] = useState(5);

  useEffect(
    ()=> {
      if (errorsLeft === 0) setIsGameFinished(true);
    },
    [errorsLeft]
  );

  function onSubmitFilmHandler(e) {
    if(e.key === 'Enter') {
      setFilm(e.target.value);
      setWordInProgress(e.target.value.split('').join(' ').replace(/\w/g,'_'));
      setInputTextDisabled(false);
    }
  }

  function onSubmitTextInput(e) {
    if(e.key === 'Enter'){
      setInputTextPlaceholder(e.target.value);
      if (isSolutionState) {
        setIsGameFinished('true');
      } else {
        setRandomButtonDisabled(false);
        const indexes = [...film.matchAll(new RegExp(e.target.value, 'gi'))].map(a => a.index);
        if (indexes.length === 0) {
          setErrorsLeft(errorsLeft - 1);
        } else {
          let tempArray = [...wordInProgress.slice().split('').filter((element) => element !== ' ')];
          indexes.forEach((index) => tempArray[index] = e.target.value);
          if (film === tempArray.join('')) {
            setIsGameFinished('true');
            setInputTextPlaceholder(film);
          }
          setWordInProgress(tempArray.map((element) => (element === ' ') ? '_' : element).join(' '));
          const totalPoints = randomPoints * indexes.length;
          setScore(score + totalPoints);
          setInputTextDisabled(true);
        }
      }
    } else {
      if (!isSolutionState) {
        if (e.target.value.length > 0) {
          alert('Introduce solo una letra');
          e.preventDefault();
          e.target.value = '';
        } 
      }
    }
  }
  
  function onClickButton() {
    const randomScore = scores[Math.floor(Math.random() * scores.length)];
    setRandomPoints(randomScore);
    
    setInputTextPlaceholder('Dame una letra');
    setIsSolutionState(false);
    setRandomButtonDisabled(true);
    setInputTextDisabled(false);
  }
  
  return (  
    <>
      
      {
        !film && !isGameFinished &&
        <>
          <div className='w3-display-container w3-display-middle'>
            <h1 className='w3-text-teal'>
              <b>¡¡¡ Juguemos a la ruleta !!!</b>
            </h1>
            <br />
            <div className='w3-display-container'>
              <input className='w3-input w3-border w3-round w3-display-middle' style={{width: '30%'}} type="password" placeholder="Dame una película" onKeyPress={onSubmitFilmHandler} autoFocus/>
            </div>
          </div>
        </>
      }

    {
      film && !isGameFinished &&
      
      <div className='w3-display-container'>
        <p className='w3-text-amber w3-xxxlarge'>My score: {score} </p>
        <br />
        <div className='w3-animate-zoom w3-xlarge'>Número de errores permitidos: {errorsLeft} </div>
        <br />
        <div> { wordInProgress } </div> 
        <br />
        {
          (randomPoints>0) &&
          
          <>
          <div> { randomPoints } </div>
          <br />
          </>
        }
        <div><button className='w3-button w3-light-blue w3-round-large' type="submit" onClick={onClickButton} disabled={randomButtonDisabled} >Girar la ruleta</button></div>
        <br />
        <br />
        <div className='w3-display-container'>
          <input className='w3-input w3-border w3-round w3-display-middle' style={{width: '30%'}} type="text" placeholder={inputTextPlaceholder} onKeyPress={onSubmitTextInput} disabled={inputTextDisabled} autoFocus/>
        </div>
      </div>
      }
  
      {
        isGameFinished && (film === inputTextPlaceholder) ?

        <div>

          <div className="row m-2">
            <div className="display-2 col-12 col-sm-12 col-md-12 d-flex justify-content-center p-3 text-info">¡¡¡ Enhorabuena, has ganado !!!</div>
            <div><img src={logo}></img></div>
          </div>
          <div className="row m-2">
          <div className='w3-display-container w3-display-middle'>
            <h1 className='w3-text-teal'>
              <b>¡¡¡ Enhorabuena, has ganado !!!</b>
            </h1>
            <br />
            <div className='w3-display-container'>
            <div className='w3-container w3-center'>
              <div style={{width:'480px'}}><iframe allow={"fullscreen"} frameBorder="0" height="270" src="https://giphy.com/embed/MtGY4FcgMmgzFXSXca/video" width="480"></iframe></div>
            </div>
            </div>
          </div>
          </div>

        </div>

          :
          
          isGameFinished &&
          
          <div className='w3-display-container w3-display-middle'>
            <h1 className='w3-text-teal'>
              <b>¡¡¡ Lo siento, has perdido !!!</b>
            </h1>
            <br />
            <div className='w3-display-container'>
            <div className='w3-container w3-center'>
              <div style={{width:'480px'}}><iframe allow={"fullscreen"} frameBorder="0" height="270" src="https://giphy.com/embed/vMmnJti6wQPDy" width="480"></iframe></div>
            </div>
            </div>
          </div>
      }

    </>
  );
}

export default WheelOfFortune;
