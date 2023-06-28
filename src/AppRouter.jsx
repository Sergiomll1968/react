import { useRoutes } from "react-router-dom";
import App from './pages/App/App.jsx';
import Flags from './pages/Flags/Flags.jsx';
import URLParams from './pages/URLParams/URLParams.jsx';
import Bookings from './pages/Bookings/Bookings.jsx';
import Booking from './pages/Booking/Booking.jsx';
import Calc from './pages/Calc/Calc.jsx';
import WheelOfFortune from './pages/WheelOfFortune/WheelOfFortune.jsx';

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
      {
        element: <Calc />,
        path: '/calc',
      },
      {
        element: <WheelOfFortune />,
        path: '/WheelOfFortune',
      },
    ]
  )
}

export default AppRouter;
