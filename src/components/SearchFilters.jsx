import { useState } from 'react';
import Select from 'react-select';

const SearchFilters = ({ type, options, onApplyFilters }) => {
  const [filters, setFilters] = useState({});
  
  const handleChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
  };
  
  const renderFlightFilters = () => (
    <>
      <div className="form-group">
        <label htmlFor="cabinClass" className="form-label">Cabin Class</label>
        <Select
          id="cabinClass"
          options={[
            { value: 'Economy', label: 'Economy' },
            { value: 'Premium Economy', label: 'Premium Economy' },
            { value: 'Business', label: 'Business' },
            { value: 'First', label: 'First' }
          ]}
          onChange={(option) => handleChange('cabinClass', option.value)}
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="Any Class"
          isClearable
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="maxPrice" className="form-label">Maximum Price ($)</label>
        <input
          type="number"
          id="maxPrice"
          className="form-input"
          placeholder="Any Price"
          onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : null)}
        />
      </div>
      
      <div className="form-group">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            onChange={(e) => handleChange('directOnly', e.target.checked)}
          />
          <span className="text-sm font-medium text-gray-700">Direct flights only</span>
        </label>
      </div>
    </>
  );
  
  const renderHotelFilters = () => (
    <>
      <div className="form-group">
        <label htmlFor="minStarRating" className="form-label">Minimum Star Rating</label>
        <Select
          id="minStarRating"
          options={[
            { value: 3, label: '3+ Stars' },
            { value: 3.5, label: '3.5+ Stars' },
            { value: 4, label: '4+ Stars' },
            { value: 4.5, label: '4.5+ Stars' },
            { value: 5, label: '5 Stars' }
          ]}
          onChange={(option) => handleChange('minStarRating', option ? option.value : null)}
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="Any Rating"
          isClearable
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="maxPrice" className="form-label">Maximum Price per Night ($)</label>
        <input
          type="number"
          id="maxPrice"
          className="form-input"
          placeholder="Any Price"
          onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : null)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="maxDistance" className="form-label">Maximum Distance (miles)</label>
        <input
          type="number"
          id="maxDistance"
          className="form-input"
          placeholder="Any Distance"
          onChange={(e) => handleChange('maxDistance', e.target.value ? Number(e.target.value) : null)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="chain" className="form-label">Hotel Chain</label>
        <Select
          id="chain"
          isMulti
          options={[
            { value: 'Marriott', label: 'Marriott' },
            { value: 'Hilton', label: 'Hilton' },
            { value: 'Hyatt', label: 'Hyatt' },
            { value: 'IHG', label: 'IHG' },
            { value: 'Accor', label: 'Accor' }
          ]}
          onChange={(options) => handleChange('chain', options ? options.map(o => o.value) : [])}
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="Any Chain"
        />
      </div>
    </>
  );
  
  const renderCarFilters = () => (
    <>
      <div className="form-group">
        <label htmlFor="carType" className="form-label">Car Type</label>
        <Select
          id="carType"
          isMulti
          options={[
            { value: 'Economy', label: 'Economy' },
            { value: 'Compact', label: 'Compact' },
            { value: 'Mid-size', label: 'Mid-size' },
            { value: 'Standard', label: 'Standard' },
            { value: 'SUV', label: 'SUV' },
            { value: 'Luxury', label: 'Luxury' }
          ]}
          onChange={(options) => handleChange('carType', options ? options.map(o => o.value) : [])}
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="Any Type"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="maxPrice" className="form-label">Maximum Price per Day ($)</label>
        <input
          type="number"
          id="maxPrice"
          className="form-input"
          placeholder="Any Price"
          onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : null)}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="vendor" className="form-label">Vendor</label>
        <Select
          id="vendor"
          isMulti
          options={[
            { value: 'Enterprise', label: 'Enterprise' },
            { value: 'Hertz', label: 'Hertz' },
            { value: 'Avis', label: 'Avis' },
            { value: 'Budget', label: 'Budget' },
            { value: 'National', label: 'National' }
          ]}
          onChange={(options) => handleChange('vendor', options ? options.map(o => o.value) : [])}
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="Any Vendor"
        />
      </div>
    </>
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">Filter Options</h3>
      <form onSubmit={handleSubmit}>
        {type === 'flight' && renderFlightFilters()}
        {type === 'hotel' && renderHotelFilters()}
        {type === 'car' && renderCarFilters()}
        
        <div className="mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
