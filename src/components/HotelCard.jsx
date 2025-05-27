import { FaStar, FaWifi, FaSwimmingPool, FaDumbbell, FaUtensils, FaBriefcase, FaSpa, FaGlassMartiniAlt, FaConcierge, FaBed } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import PolicyViolationAlert from './PolicyViolationAlert';
import { usePolicyContext } from '../contexts/PolicyContext';

const HotelCard = ({ hotel, onSelect, isSelected }) => {
  const { checkPolicyCompliance } = usePolicyContext();
  const { compliant, violations } = checkPolicyCompliance('hotel', hotel);
  
  // Map amenities to icons
  const amenityIcons = {
    'Free Wi-Fi': <FaWifi />,
    'Pool': <FaSwimmingPool />,
    'Fitness Center': <FaDumbbell />,
    'Restaurant': <FaUtensils />,
    'Business Center': <FaBriefcase />,
    'Spa': <FaSpa />,
    'Bar': <FaGlassMartiniAlt />,
    'Concierge': <FaConcierge />,
    'Room Service': <FaBed />
  };

  return (
    <div className={`card mb-4 border-2 transition-all ${isSelected ? 'border-primary-500' : 'border-transparent hover:border-primary-200'}`}>
      <div className="flex flex-col md:flex-row">
        {/* Hotel Image */}
        <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
          <img 
            src={hotel.image} 
            alt={hotel.name} 
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
        
        {/* Hotel Details */}
        <div className="md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">{hotel.name}</h3>
              <p className="text-sm text-gray-500">{hotel.chain}</p>
              
              {/* Star Rating */}
              <div className="flex items-center mt-1">
                {[...Array(Math.floor(hotel.starRating))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                {hotel.starRating % 1 !== 0 && (
                  <FaStar className="text-yellow-400 opacity-50" />
                )}
                <span className="ml-1 text-sm text-gray-500">({hotel.starRating})</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-700">${hotel.price}<span className="text-sm font-normal text-gray-500">/night</span></div>
              <div className="text-sm text-gray-500">${hotel.totalPrice} total</div>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <MdLocationOn className="mr-1" />
            <span>{hotel.address}</span>
          </div>
          
          {/* Distance */}
          <div className="mt-1 text-sm text-gray-600">
            <span>{hotel.distance} miles from destination</span>
          </div>
          
          {/* Amenities */}
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Amenities</h4>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs">
                  <span className="mr-1">{amenityIcons[amenity] || null}</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Button */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm">
              {hotel.availableRooms} rooms available • {hotel.refundable ? 'Refundable' : 'Non-refundable'}
            </div>
            <button 
              onClick={() => onSelect(hotel)}
              className={`btn ${isSelected ? 'btn-success' : 'btn-primary'}`}
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Policy Violation Alert */}
      {!compliant && <PolicyViolationAlert violations={violations} />}
    </div>
  );
};

export default HotelCard;
