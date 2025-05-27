import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaHotel, FaCar, FaUser, FaClipboardList, FaHistory, FaChartLine } from 'react-icons/fa';
import { useTripContext } from '../contexts/TripContext';
import TravelerInfoForm from '../components/TravelerInfoForm';
import { tripApi } from '../api/apiService';

const Dashboard = () => {
  const { tripData } = useTripContext();
  const [tripHistory, setTripHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Calculate booking progress
  const calculateProgress = () => {
    let steps = 0;
    let completed = 0;
    
    // Traveler info
    steps++;
    if (tripData.traveler.name && tripData.traveler.email) {
      completed++;
    }
    
    // Flight
    steps++;
    if (tripData.flight) {
      completed++;
    }
    
    // Hotel
    steps++;
    if (tripData.hotel) {
      completed++;
    }
    
    // Car
    steps++;
    if (tripData.car) {
      completed++;
    }
    
    return {
      percentage: Math.round((completed / steps) * 100),
      completed,
      total: steps
    };
  };
  
  const progress = calculateProgress();
  
  // Fetch trip history
  useEffect(() => {
    const fetchTripHistory = async () => {
      setLoading(true);
      try {
        // In a real app, you would use the actual user ID
        const userId = 'user123';
        const response = await tripApi.getHistory(userId);
        
        if (response.success) {
          setTripHistory(response.data);
        }
      } catch (error) {
        console.error('Error fetching trip history:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTripHistory();
  }, []);
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Start planning a new business trip</p>
      </div>
      
      {/* Booking Progress */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaClipboardList className="text-primary-600 mr-2" />
          Current Booking Progress
        </h2>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span>Completed {progress.completed} of {progress.total} steps</span>
            <span>{progress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${progress.percentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg border ${tripData.traveler.name ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
            <div className="flex items-center mb-2">
              <FaUser className={`mr-2 ${tripData.traveler.name ? 'text-green-500' : 'text-gray-400'}`} />
              <h3 className="font-medium">Traveler Info</h3>
            </div>
            <p className="text-sm text-gray-600">
              {tripData.traveler.name ? tripData.traveler.name : 'Not completed'}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg border ${tripData.flight ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
            <div className="flex items-center mb-2">
              <FaPlane className={`mr-2 ${tripData.flight ? 'text-green-500' : 'text-gray-400'}`} />
              <h3 className="font-medium">Flight</h3>
            </div>
            <p className="text-sm text-gray-600">
              {tripData.flight ? `${tripData.flight.airline} ${tripData.flight.flightNumber}` : 'Not selected'}
            </p>
            {!tripData.flight && (
              <Link to="/flights" className="text-sm text-primary-600 hover:underline mt-1 inline-block">
                Select a flight
              </Link>
            )}
          </div>
          
          <div className={`p-4 rounded-lg border ${tripData.hotel ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
            <div className="flex items-center mb-2">
              <FaHotel className={`mr-2 ${tripData.hotel ? 'text-green-500' : 'text-gray-400'}`} />
              <h3 className="font-medium">Hotel</h3>
            </div>
            <p className="text-sm text-gray-600">
              {tripData.hotel ? tripData.hotel.name : 'Not selected'}
            </p>
            {!tripData.hotel && (
              <Link to="/hotels" className="text-sm text-primary-600 hover:underline mt-1 inline-block">
                Select a hotel
              </Link>
            )}
          </div>
          
          <div className={`p-4 rounded-lg border ${tripData.car ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
            <div className="flex items-center mb-2">
              <FaCar className={`mr-2 ${tripData.car ? 'text-green-500' : 'text-gray-400'}`} />
              <h3 className="font-medium">Car Rental</h3>
            </div>
            <p className="text-sm text-gray-600">
              {tripData.car ? `${tripData.car.vendor} - ${tripData.car.model}` : 'Not selected'}
            </p>
            {!tripData.car && (
              <Link to="/cars" className="text-sm text-primary-600 hover:underline mt-1 inline-block">
                Select a car
              </Link>
            )}
          </div>
        </div>
        
        {progress.percentage === 100 && (
          <div className="mt-4">
            <Link to="/summary" className="btn btn-primary w-full md:w-auto">
              Review & Submit Trip
            </Link>
          </div>
        )}
      </div>
      
      {/* Traveler Information Form */}
      <TravelerInfoForm />
      
      {/* Recent Trips */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaHistory className="text-primary-600 mr-2" />
          Recent Trips
        </h2>
        
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Loading trip history...</p>
          </div>
        ) : tripHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trip ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tripHistory.map((trip) => {
                  const totalCost = (trip.flight?.price || 0) + (trip.hotel?.totalPrice || 0) + (trip.car?.totalPrice || 0);
                  
                  return (
                    <tr key={trip.tripId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {trip.tripId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(trip.bookingDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {trip.flight?.destination || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {trip.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${totalCost}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <FaClipboardList className="mx-auto text-gray-400 text-4xl mb-2" />
            <p className="text-gray-500">No trip history found</p>
            <p className="text-sm text-gray-400 mt-1">Your completed trips will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
