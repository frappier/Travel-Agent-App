import { format } from 'date-fns';
import { FaPlane, FaClock, FaExchangeAlt } from 'react-icons/fa';
import PolicyViolationAlert from './PolicyViolationAlert';
import { usePolicyContext } from '../contexts/PolicyContext';

const FlightCard = ({ flight, onSelect, isSelected }) => {
  const { checkPolicyCompliance } = usePolicyContext();
  const { compliant, violations } = checkPolicyCompliance('flight', flight);
  
  const formatTime = (dateString) => {
    return format(new Date(dateString), 'h:mm a');
  };
  
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'EEE, MMM d');
  };

  return (
    <div className={`card mb-4 border-2 transition-all ${isSelected ? 'border-primary-500' : 'border-transparent hover:border-primary-200'}`}>
      <div className="flex flex-col md:flex-row md:items-center">
        {/* Airline Logo */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <img 
              src={flight.logo} 
              alt={`${flight.airline} logo`} 
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
        
        {/* Flight Details */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-gray-500">{flight.airline} {flight.flightNumber}</div>
            <div className="flex items-center mt-1">
              <div className="text-xl font-semibold">{formatTime(flight.departureTime)}</div>
              <div className="mx-2 text-gray-400">-</div>
              <div className="text-xl font-semibold">{formatTime(flight.arrivalTime)}</div>
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(flight.departureTime)}
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-sm text-gray-500">{flight.duration}</div>
            <div className="relative w-full my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="h-0.5 w-full bg-gray-200"></div>
              </div>
              <div className="relative flex justify-between">
                <div className="h-2 w-2 rounded-full bg-primary-600"></div>
                {flight.stops > 0 && (
                  <div className="h-2 w-2 rounded-full bg-warning-500"></div>
                )}
                <div className="h-2 w-2 rounded-full bg-primary-600"></div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}
            </div>
          </div>
          
          <div className="flex flex-col items-end justify-center">
            <div className="text-2xl font-bold text-primary-700">${flight.price}</div>
            <div className="text-sm text-gray-500">{flight.cabinClass}</div>
            <div className="text-sm text-gray-500">
              {flight.seatsAvailable} seats left
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
          <button 
            onClick={() => onSelect(flight)}
            className={`btn ${isSelected ? 'btn-success' : 'btn-primary'}`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
      
      {/* Additional Details */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center">
            <FaPlane className="mr-2 text-gray-500" />
            <span>{flight.departureAirport} → {flight.arrivalAirport}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2 text-gray-500" />
            <span>{flight.duration}</span>
          </div>
          {flight.refundable && (
            <div className="flex items-center">
              <FaExchangeAlt className="mr-2 text-gray-500" />
              <span>Refundable</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Policy Violation Alert */}
      {!compliant && <PolicyViolationAlert violations={violations} />}
    </div>
  );
};

export default FlightCard;
