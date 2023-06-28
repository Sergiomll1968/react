import './WheelOfFortune.css';
import { useState, useEffect } from 'react';



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
    }
  }

  function onSubmitTextInput(e) {
    if(e.key === 'Enter'){
      setInputTextPlaceholder(e.target.value);
      if (isSolutionState) {
        setIsGameFinished('true');
      } else {
        // aqui si se introduce mas de un caracter (con un useffect) ya vemos
        setRandomButtonDisabled(false);
        const indexes = [...film.matchAll(new RegExp(e.target.value, 'gi'))].map(a => a.index);
        if (indexes.length === 0) {
          setErrorsLeft(errorsLeft - 1);
        } else {
          let tempArray = [...wordInProgress.slice().split('').filter((element) => element !== ' ')];
          indexes.forEach((index) => tempArray[index] = e.target.value);
          setWordInProgress(tempArray.map((element) => (element === ' ') ? '_' : element).join(' '));
          const totalPoints = randomPoints * indexes.length;
          setScore(score + totalPoints);
          setInputTextDisabled(true);
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
        <div>Pantalla inicial</div>
        <br />
        <input type="password" placeholder="Dame una película" onKeyPress={onSubmitFilmHandler}/>
        </>
      }

    {
      film && !isGameFinished &&
      
      <div className='container'>
        <h1>My score: {score} </h1>
        <br />
        <div>Número de errores permitidos: {errorsLeft} </div>
        <br />
        <div> { wordInProgress } </div> 
        <br />
        {
          (randomPoints>0) &&
          
          <>
          <div> { randomPoints } </div>
          </>
        }
        {/* {
          randomButtonDisabled && */}
            
          <div><button type="submit" onClick={onClickButton} disabled={randomButtonDisabled} >Girar la ruleta</button></div>
        {/* } */}
        <br />
        <br />
        <input type="text" placeholder={inputTextPlaceholder} onKeyPress={onSubmitTextInput} disabled={inputTextDisabled} />
      </div>
      }
  
      {
        isGameFinished && (film === inputTextPlaceholder) ? <div>gana</div> : isGameFinished && <div>pierde</div>
        
      }

    </>
  );
}

export default WheelOfFortune;
