import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FlightSearch from './pages/FlightSearch';
import HotelSearch from './pages/HotelSearch';
import CarRentalSearch from './pages/CarRentalSearch';
import TripSummary from './pages/TripSummary';
import { TripProvider } from './contexts/TripContext';
import { PolicyProvider } from './contexts/PolicyContext';

function App() {
  return (
    <TripProvider>
      <PolicyProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="flights" element={<FlightSearch />} />
            <Route path="hotels" element={<HotelSearch />} />
            <Route path="cars" element={<CarRentalSearch />} />
            <Route path="summary" element={<TripSummary />} />
          </Route>
        </Routes>
      </PolicyProvider>
    </TripProvider>
  );
}

export default App;
