import { useState } from 'react';
import { FaCog, FaPlane, FaHotel, FaCar, FaSave, FaUndo } from 'react-icons/fa';
import { usePolicyContext } from '../contexts/PolicyContext';
import { toast } from 'react-toastify';

const PolicySettings = () => {
  const { policies, updatePolicies } = usePolicyContext();
  const [formData, setFormData] = useState({
    flight: { ...policies.flight },
    hotel: { ...policies.hotel },
    car: { ...policies.car }
  });
  
  const handleChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };
  
  const handleArrayChange = (category, field, value) => {
    setFormData(prev => {
      const currentValues = prev[category][field];
      
      // If value is already in array, remove it
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [field]: currentValues.filter(item => item !== value)
          }
        };
      } 
      // Otherwise add it
      else {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [field]: [...currentValues, value]
          }
        };
      }
    });
  };
  
  const handleSubmit = (e, category) => {
    e.preventDefault();
    updatePolicies(category, formData[category]);
    toast.success(`${category.charAt(0).toUpperCase() + category.slice(1)} policy settings updated`);
  };
  
  const resetForm = (category) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...policies[category] }
    }));
    toast.info('Form reset to current policy settings');
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Travel Policy Settings</h1>
        <p className="text-gray-600">Configure company travel policies and compliance rules</p>
      </div>
      
      {/* Flight Policy Settings */}
      <div className="card mb-6">
        <div className="flex items-center mb-4">
          <FaPlane className="text-primary-600 text-xl mr-2" />
          <h2 className="text-xl font-semibold">Flight Policy</h2>
        </div>
        
        <form onSubmit={(e) => handleSubmit(e, 'flight')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Price (USD)
              </label>
              <input
                type="number"
                value={formData.flight.maxPrice}
                onChange={(e) => handleChange('flight', 'maxPrice', parseInt(e.target.value))}
                className="form-input"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cabin Class
              </label>
              <select
                value={formData.flight.cabinClass}
                onChange={(e) => handleChange('flight', 'cabinClass', e.target.value)}
                className="form-select"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Advanced Booking (days)
              </label>
              <input
                type="number"
                value={formData.flight.advancedBooking}
                onChange={(e) => handleChange('flight', 'advancedBooking', parseInt(e.target.value))}
                className="form-input"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum days before departure</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Direct Flights Only
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    checked={formData.flight.directFlightsOnly === true}
                    onChange={() => handleChange('flight', 'directFlightsOnly', true)}
                    className="form-radio"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    checked={formData.flight.directFlightsOnly === false}
                    onChange={() => handleChange('flight', 'directFlightsOnly', false)}
                    className="form-radio"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Airlines
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {['Delta', 'United', 'American', 'Southwest', 'JetBlue', 'Alaska', 'Frontier', 'Spirit'].map(airline => (
                  <label key={airline} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.flight.preferredAirlines.includes(airline)}
                      onChange={() => handleArrayChange('flight', 'preferredAirlines', airline)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{airline}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={() => resetForm('flight')}
              className="btn btn-secondary"
            >
              <FaUndo className="mr-2" />
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              <FaSave className="mr-2" />
              Save Flight Policy
            </button>
          </div>
        </form>
      </div>
      
      {/* Hotel Policy Settings */}
      <div className="card mb-6">
        <div className="flex items-center mb-4">
          <FaHotel className="text-primary-600 text-xl mr-2" />
          <h2 className="text-xl font-semibold">Hotel Policy</h2>
        </div>
        
        <form onSubmit={(e) => handleSubmit(e, 'hotel')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Nightly Rate (USD)
              </label>
              <input
                type="number"
                value={formData.hotel.maxNightlyRate}
                onChange={(e) => handleChange('hotel', 'maxNightlyRate', parseInt(e.target.value))}
                className="form-input"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Star Rating
              </label>
              <select
                value={formData.hotel.maxStarRating}
                onChange={(e) => handleChange('hotel', 'maxStarRating', parseInt(e.target.value))}
                className="form-select"
              >
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Hotel Chains
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {['Marriott', 'Hilton', 'Hyatt', 'IHG', 'Accor', 'Choice', 'Wyndham', 'Best Western'].map(chain => (
                  <label key={chain} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hotel.preferredChains.includes(chain)}
                      onChange={() => handleArrayChange('hotel', 'preferredChains', chain)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{chain}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {['WiFi', 'Breakfast', 'Parking', 'Fitness Center', 'Business Center', 'Restaurant', 'Airport Shuttle', 'Laundry'].map(amenity => (
                  <label key={amenity} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hotel.amenities.includes(amenity)}
                      onChange={() => handleArrayChange('hotel', 'amenities', amenity)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={() => resetForm('hotel')}
              className="btn btn-secondary"
            >
              <FaUndo className="mr-2" />
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              <FaSave className="mr-2" />
              Save Hotel Policy
            </button>
          </div>
        </form>
      </div>
      
      {/* Car Rental Policy Settings */}
      <div className="card">
        <div className="flex items-center mb-4">
          <FaCar className="text-primary-600 text-xl mr-2" />
          <h2 className="text-xl font-semibold">Car Rental Policy</h2>
        </div>
        
        <form onSubmit={(e) => handleSubmit(e, 'car')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Daily Rate (USD)
              </label>
              <input
                type="number"
                value={formData.car.maxDailyRate}
                onChange={(e) => handleChange('car', 'maxDailyRate', parseInt(e.target.value))}
                className="form-input"
                min="0"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Approved Car Types
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {['Economy', 'Compact', 'Mid-size', 'Standard', 'Full-size', 'SUV', 'Minivan', 'Luxury'].map(type => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.car.carTypes.includes(type)}
                      onChange={() => handleArrayChange('car', 'carTypes', type)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Vendors
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {['Hertz', 'Enterprise', 'Avis', 'Budget', 'National', 'Alamo', 'Dollar', 'Thrifty'].map(vendor => (
                  <label key={vendor} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.car.preferredVendors.includes(vendor)}
                      onChange={() => handleArrayChange('car', 'preferredVendors', vendor)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{vendor}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={() => resetForm('car')}
              className="btn btn-secondary"
            >
              <FaUndo className="mr-2" />
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              <FaSave className="mr-2" />
              Save Car Rental Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PolicySettings;
