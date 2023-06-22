import './BookingDetail.css';
import DB from '../../pages/Bookings/db.js';

function BookingDetail({id}) {
  return (
    <>
      <div>
        
        <div>{DB[id].client}</div>

        <br />

        <div className='bookingContainer2'>
          <div>
            Id:
          </div>
          <div>
            Descripción:
          </div>
          <div>
            Fecha:
          </div>
          <div>
            Servicio:
          </div>
          <div>
            Precio:
          </div>
        </div>

        <br />

        <div className='bookingContainer2'>
          <div>
            {DB[id].bookingId}
          </div>
          <div>
            {DB[id].description}
          </div>
          <div>
            {DB[id].date}
          </div>
          <div>
            {DB[id].service}
          </div>
          <div>
            {DB[id].price}
          </div>
        </div>

        <br />

      </div>
    </>
  );
}

export default BookingDetail;