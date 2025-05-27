import { useState, useEffect } from 'react';
import { FaCar, FaFilter, FaSort, FaMapMarkerAlt, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { useTripContext } from '../contexts/TripContext';
import { carRentalApi } from '../api/apiService';
import CarRentalCard from '../components/CarRentalCard';
import DatePicker from 'react-datepicker';
import { format, addDays } from 'date-fns';
import { cities } from '../api/mockData';
import Select from 'react-select';

const CarRentalSearch = () => {
  const { tripData, selectCar } = useTripContext();
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(addDays(new Date(), 3));
  const [location, setLocation] = useState(null);
  const [filters, setFilters] = useState({
    carType: [],
    priceRange: [0, 200],
    vendors: []
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Search for car rentals
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    if (!location) {
      setError('Please select a pickup location');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const searchParams = {
        location: location.value,
        pickupDate: format(pickupDate, 'yyyy-MM-dd'),
        returnDate: format(returnDate, 'yyyy-MM-dd'),
        maxPrice: filters.priceRange[1],
        carType: filters.carType,
        vendor: filters.vendors
      };
      
      const response = await carRentalApi.search(searchParams);
      
      if (response.success) {
        setCars(response.data);
      } else {
        setError(response.error || 'Failed to search car rentals');
      }
    } catch (err) {
      setError('An error occurred while searching for car rentals');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Apply filters to car rental results
  const getFilteredCars = () => {
    if (!cars.length) return [];
    
    return cars.filter(car => {
      // Filter by car type
      if (filters.carType.length > 0 && !filters.carType.includes(car.carType)) {
        return false;
      }
      
      // Filter by price
      if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) {
        return false;
      }
      
      // Filter by vendor
      if (filters.vendors.length > 0 && !filters.vendors.includes(car.vendor)) {
        return false;
      }
      
      return true;
    });
  };
  
  // Sort filtered cars
  const getSortedCars = () => {
    const filteredCars = getFilteredCars();
    
    if (sortBy === 'price-low') {
      return [...filteredCars].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      return [...filteredCars].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'vendor') {
      return [...filteredCars].sort((a, b) => a.vendor.localeCompare(b.vendor));
    } else if (sortBy === 'car-type') {
      return [...filteredCars].sort((a, b) => a.carType.localeCompare(b.carType));
    }
    
    // Default: recommended
    return filteredCars;
  };
  
  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (category === 'carType' || category === 'vendors') {
        if (newFilters[category].includes(value)) {
          newFilters[category] = newFilters[category].filter(item => item !== value);
        } else {
          newFilters[category] = [...newFilters[category], value];
        }
      } else {
        newFilters[category] = value;
      }
      
      return newFilters;
    });
  };
  
  // Load initial location on component mount
  useEffect(() => {
    if (cities.length > 0) {
      setLocation({ value: 'LAX', label: 'Los Angeles, CA' });
    }
  }, []);
  
  // Search for cars when location is set
  useEffect(() => {
    if (location) {
      handleSearch();
    }
  }, [location]);
  
  const sortedCars = getSortedCars();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Car Rental Search</h1>
        <p className="text-gray-600">Find and book a rental car for your trip</p>
      </div>
      
      {/* Search Form */}
      <div className="card mb-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaMapMarkerAlt className="inline mr-1" /> Pickup Location
              </label>
              <Select
                value={location}
                onChange={setLocation}
                options={cities}
                placeholder="Select pickup location"
                className="basic-select"
                classNamePrefix="select"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" /> Pickup Date
              </label>
              <DatePicker
                selected={pickupDate}
                onChange={date => setPickupDate(date)}
                className="form-input w-full"
                minDate={new Date()}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" /> Return Date
              </label>
              <DatePicker
                selected={returnDate}
                onChange={date => setReturnDate(date)}
                className="form-input w-full"
                minDate={pickupDate}
              />
            </div>
            
            <div className="flex items-end">
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Searching...
                  </>
                ) : (
                  'Search Cars'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Results Section */}
      {!loading && sortedCars.length > 0 && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters (Mobile Toggle) */}
          <div className="md:hidden mb-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-secondary w-full"
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters (Sidebar) */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-1/4`}>
            <div className="card sticky top-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FaFilter className="mr-2" /> Filters
              </h2>
              
              {/* Car Type Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Car Type</h3>
                <div className="space-y-2">
                  {['Economy', 'Compact', 'Mid-size', 'SUV', 'Sports', 'Luxury'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.carType.includes(type)}
                        onChange={() => handleFilterChange('carType', type)}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              {/* Vendor Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Vendors</h3>
                <div className="space-y-2">
                  {['Hertz', 'Enterprise', 'Avis', 'Budget', 'National'].map(vendor => (
                    <label key={vendor} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.vendors.includes(vendor)}
                        onChange={() => handleFilterChange('vendors', vendor)}
                        className="mr-2"
                      />
                      {vendor}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Features Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Features</h3>
                <div className="space-y-2">
                  {['Automatic', 'A/C', 'Navigation', 'Bluetooth'].map(feature => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                      />
                      {feature}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results List */}
          <div className={`${showFilters ? 'hidden' : 'block'} md:block md:w-3/4`}>
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-gray-600">{sortedCars.length} cars available</span>
              </div>
              
              <div className="flex items-center">
                <label className="mr-2 text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select w-auto"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="vendor">Vendor</option>
                  <option value="car-type">Car Type</option>
                </select>
              </div>
            </div>
            
            {/* Car Listings */}
            <div>
              {sortedCars.map(car => (
                <CarRentalCard
                  key={car.id}
                  car={car}
                  onSelect={selectCar}
                  isSelected={tripData.car && tripData.car.id === car.id}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <FaSpinner className="animate-spin text-primary-600 text-4xl mb-4" />
          <p className="text-gray-600">Searching for the best car rentals...</p>
        </div>
      )}
      
      {/* No Results */}
      {!loading && sortedCars.length === 0 && !error && (
        <div className="card py-12">
          <div className="text-center">
            <FaCar className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No car rentals found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
            <button 
              onClick={() => {
                setFilters({
                  carType: [],
                  priceRange: [0, 200],
                  vendors: []
                });
                handleSearch();
              }}
              className="btn btn-primary"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarRentalSearch;
