import './UseAPIRequest.css'
import { useAPIRequest } from '../../hooks/useAPIRequest.js';
import { useState } from 'react';

// import "gridjs/dist/theme/mermaid.css";

function UseAPIRequest() {
  const { getData, data, error, loading } = useAPIRequest();
  const arrowUp = String.fromCodePoint(0x21E7);
  const arrowDown = String.fromCodePoint(0x21E9);
  const deletefilterIcon = String.fromCodePoint(0x26D2);
  const [order, setOrder] = useState([0,arrowUp]) // 0 -> No ordenado, 1 -> Ascendente, 2 -> Descendente

  function sortTable() {
    getData({searchString: order[0], searchType: 'order'});
    setOrder(order[0] === 0? [1,arrowDown] : order[0] === 1 ? [2,deletefilterIcon] : [0,arrowUp]);
  }
  
  return (
    <>
      <h1>Hola</h1>

      { loading && <h2>Loading...</h2>}
      { error && <h2> Ha ocurrido un error: { error.message }</h2>}

      <div>
        <label htmlFor='allData'> Todos los datos </label>
        <button name="allData" onClick = {() => getData({route: 'services/all'})}> Obtener datos </button>
      </div>

      <br />

      <div>
      <label htmlFor='byDate'> Datos por fecha </label>
        <input name="byDate" type="date" onChange={(e) => getData({route: `bookings/day/${e.target.value}`})}></input>
      </div>

      <br />

      <div>
      <label htmlFor='filter'> Filtrado por descripción </label>
        <input type="text" onChange={(e) => getData({searchString: e.target.value, searchType: 'filter'})}></input>
      </div>

      <br />

      <div>
        <table>
          <thead>
            <tr>
              {data && Object.keys(data[0]).map((element,idx) =>
              <th key={idx} > <span>{element}</span> <span className={'styledArrow'} onClick={() => {sortTable()}}> {`${order[1]}`} </span> </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data && data.map((element,idx) =>
            <tr key={idx}>
              <td>{Object.values(element)[0]}</td>
              <td>{Object.values(element)[1]}</td>
              <td>{Object.values(element)[2]}</td>
              <td>{Object.values(element)[3]}</td>
              <td>{Object.values(element)[4]}</td>
              <td>{Object.values(element)[5] === false ? 'No' : 'Yes'}</td>
              <td>{Object.values(element)[6]}</td>
              <td>{Object.values(element)[7]}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
      
      { data && JSON.stringify(data) }

    </>
  );
}

export default UseAPIRequest;
