import { useNavigate } from 'react-router-dom';
import './Bookings.css';
import DB from './db.js';

function Bookings() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Citas</h1>
      <br />

      <div className="bookingContainer">
        <div>Descripción</div>
        <div>Fecha</div>
        <div></div>
      </div>

      <br />
      <div className='bookingsContainer'>
        <div>
          { DB.map((element, index) => 
            <div className='bookingContainer' key = {element.bookingId+index}>
              <div>
                {element.description}
              </div>
              <div>
                {element.date}
              </div>
              <div>
                <button className = 'myButton' key = {element.bookingId} onClick = { () => navigate(`/bookingDetails/${element.bookingId}`)}> Ir a detalles </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Bookings;
