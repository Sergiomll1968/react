import { useNavigate, useParams } from 'react-router-dom';
import './Booking.css';
import BookingDetail from '../../components/Booking/BookingDetail.jsx'

function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const index = id - 1;
  
  return (
    <>
      <h1>Detalle</h1>
      <br />
      <div>
        <BookingDetail id={index} />
        <div>
          <button className = 'myButton' onClick={ () => navigate('/bookings')}> Ir a listado inicial </button>
        </div>
      </div>
    </>
  );
}

export default Booking;