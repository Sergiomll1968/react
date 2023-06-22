import './App.css';

function App() {
  const myArray = [
    { id: 'id1', name: 'Paulo', age: 18, color: 'blue' },
    { id: 'id2', name: 'Sergio 1', age: 17, color: 'red' },
    { id: 'id3', name: 'Carlos', age: 19, color: 'green' },
    { id: 'id4', name: 'Jona', age: 99, color: 'violet' },
    { id: 'id5', name: 'Sergio 2', age: 22, color: 'orange' },
  ];

  return (
    <>
      <h1>Entendiendo JSX</h1>
      { myArray.map((element) => {
          return <div style={{color: element.color}} key = {element.id} className= {(element.age%2 === 0)? 'greentext': 'bluetext'}>  Hola, soy {element.name}, y tengo {element.age} años </div>
        })
      }
      <br></br>
      <div>La media de edad es: {myArray.reduce((acum,element) => acum + element.age, 0) / myArray.length} </div>
    </>
  );
}

export default App;
