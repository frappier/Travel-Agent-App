import { FaCar, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { usePolicyContext } from '../contexts/PolicyContext';
import PolicyViolationAlert from './PolicyViolationAlert';

const CarRentalCard = ({ car, onSelect, isSelected }) => {
  const { checkPolicyCompliance } = usePolicyContext();
  const { compliant, violations } = checkPolicyCompliance('car', car);
  
  return (
    <div 
      className={`card mb-4 border-2 transition-all ${isSelected ? 'border-primary-500' : 'border-transparent hover:border-primary-200'}`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Car Image */}
        <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
          <img 
            src={car.image} 
            alt={car.model} 
            className="w-full h-40 object-cover rounded-md"
          />
        </div>
        
        {/* Car Details */}
        <div className="md:w-2/4">
          <div className="flex items-center mb-2">
            <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-md mr-2">
              {car.carType}
            </span>
            <h3 className="text-lg font-semibold">{car.model}</h3>
          </div>
          
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
              <FaCar className="text-primary-600 text-sm" />
            </div>
            <span className="text-sm text-gray-600">{car.vendor}</span>
          </div>
          
          <p className="text-sm text-gray-500 mb-2">
            <strong>Pickup:</strong> {car.pickupLocation}
          </p>
          
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Features</h4>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature, index) => (
                <div key={index} className="bg-gray-100 px-2 py-1 rounded-md text-xs">
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <span className={`mr-2 ${car.availableCars < 3 ? 'text-red-600' : 'text-green-600'}`}>
              {car.availableCars} {car.availableCars === 1 ? 'car' : 'cars'} available
            </span>
            
            {car.refundable ? (
              <span className="text-green-600 flex items-center">
                <FaCheck className="mr-1" /> Free cancellation
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <FaExclamationTriangle className="mr-1" /> Non-refundable
              </span>
            )}
          </div>
        </div>
        
        {/* Price and Action */}
        <div className="md:w-1/4 flex flex-col items-end justify-between mt-4 md:mt-0">
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-700">${car.price}<span className="text-sm font-normal text-gray-500">/day</span></div>
            <div className="text-sm text-gray-500">${car.totalPrice} total</div>
          </div>
          
          <div className="mt-4">
            <button 
              onClick={() => onSelect(car)}
              className={`btn ${isSelected ? 'btn-success' : 'btn-primary'}`}
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Policy Compliance Alert */}
      {!compliant && <PolicyViolationAlert violations={violations} />}
    </div>
  );
};

export default CarRentalCard;
