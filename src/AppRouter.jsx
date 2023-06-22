import { useRoutes } from "react-router-dom";
import App from './pages/App/App.jsx';
import Flags from './pages/Flags/Flags.jsx';
import URLParams from './pages/URLParams/URLParams.jsx';
import Bookings from './pages/Bookings/Bookings.jsx';
import Booking from './pages/Booking/Booking.jsx';

function AppRouter() {
  return useRoutes(
    [
      {
        element: <App />,
        path: '/',
      },
      {
        element: <Flags />,
        path: '/flags',
      },
      {
        element: <URLParams />,
        path: 'url-params/:param',
      },
      {
        element: <Bookings />,
        path: '/bookings',
      },
      {
        element: <Booking />,
        path: '/bookingDetails/:id',
      },
    ]
  )
}

export default AppRouter; // z
