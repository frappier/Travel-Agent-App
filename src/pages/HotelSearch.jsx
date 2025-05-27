import { useState, useEffect } from 'react';
import { FaHotel, FaFilter, FaSort, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaWifi, FaParking, FaSwimmingPool, FaUtensils, FaSpinner } from 'react-icons/fa';
import { useTripContext } from '../contexts/TripContext';
import { usePolicyContext } from '../contexts/PolicyContext';
import DatePicker from 'react-datepicker';
import { format, addDays, differenceInDays } from 'date-fns';
import { hotelApi } from '../api/apiService';
import { cities } from '../api/mockData';
import PolicyViolationAlert from '../components/PolicyViolationAlert';
import Select from 'react-select';

const HotelSearch = () => {
  const { tripData, selectHotel } = useTripContext();
  const { checkPolicyCompliance } = usePolicyContext();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 3));
  const [location, setLocation] = useState(null);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    starRating: [],
    amenities: [],
    chains: []
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Calculate number of nights
  const nights = differenceInDays(checkOutDate, checkInDate);
  
  // Search for hotels
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    if (!location) {
      setError('Please select a destination');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const searchParams = {
        location: location.value,
        checkInDate: format(checkInDate, 'yyyy-MM-dd'),
        checkOutDate: format(checkOutDate, 'yyyy-MM-dd'),
        guests,
        rooms,
        maxPrice: filters.priceRange[1],
        minStarRating: Math.min(...filters.starRating) || 0,
        chain: filters.chains
      };
      
      const response = await hotelApi.search(searchParams);
      
      if (response.success) {
        setHotels(response.data);
      } else {
        setError(response.error || 'Failed to search hotels');
      }
    } catch (err) {
      setError('An error occurred while searching for hotels');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Apply filters to hotel results
  const getFilteredHotels = () => {
    if (!hotels.length) return [];
    
    return hotels.filter(hotel => {
      // Filter by price
      if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
        return false;
      }
      
      // Filter by star rating
      if (filters.starRating.length > 0 && !filters.starRating.includes(hotel.starRating)) {
        return false;
      }
      
      // Filter by hotel chain
      if (filters.chains.length > 0 && !filters.chains.includes(hotel.chain)) {
        return false;
      }
      
      // Filter by amenities
      if (filters.amenities.length > 0) {
        const hotelAmenities = hotel.amenities.map(a => a.toLowerCase());
        const requiredAmenities = filters.amenities.map(a => a.toLowerCase());
        
        for (const amenity of requiredAmenities) {
          if (!hotelAmenities.some(a => a.includes(amenity))) {
            return false;
          }
        }
      }
      
      return true;
    });
  };
  
  // Sort filtered hotels
  const getSortedHotels = () => {
    const filteredHotels = getFilteredHotels();
    
    if (sortBy === 'price-low') {
      return [...filteredHotels].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      return [...filteredHotels].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      return [...filteredHotels].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'stars') {
      return [...filteredHotels].sort((a, b) => b.starRating - a.starRating);
    } else if (sortBy === 'distance') {
      return [...filteredHotels].sort((a, b) => a.distance - b.distance);
    }
    
    // Default: recommended
    return filteredHotels;
  };
  
  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (category === 'starRating' || category === 'amenities' || category === 'chains') {
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
  
  const handleSelectHotel = (hotel) => {
    selectHotel({
      ...hotel,
      checkInDate: format(checkInDate, 'MMM dd, yyyy'),
      checkOutDate: format(checkOutDate, 'MMM dd, yyyy'),
      nights
    });
  };
  
  // Map amenities to icons
  const amenityIcons = {
    'Free Wi-Fi': <FaWifi />,
    'Parking': <FaParking />,
    'Pool': <FaSwimmingPool />,
    'Restaurant': <FaUtensils />
  };
  
  // Load initial location on component mount
  useEffect(() => {
    if (cities.length > 0) {
      setLocation({ value: 'LAX', label: 'Los Angeles, CA' });
    }
  }, []);
  
  // Search for hotels when location is set
  useEffect(() => {
    if (location) {
      handleSearch();
    }
  }, [location]);
  
  const sortedHotels = getSortedHotels();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Hotel Search</h1>
        <p className="text-gray-600">Find and book accommodations for your business trip</p>
      </div>
      
      {/* Search Form */}
      <div className="card mb-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaMapMarkerAlt className="inline mr-1" /> Destination
              </label>
              <Select
                value={location}
                onChange={setLocation}
                options={cities}
                placeholder="Select destination"
                className="basic-select"
                classNamePrefix="select"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" /> Check-in
              </label>
              <DatePicker
                selected={checkInDate}
                onChange={date => setCheckInDate(date)}
                className="form-input w-full"
                minDate={new Date()}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" /> Check-out
              </label>
              <DatePicker
                selected={checkOutDate}
                onChange={date => setCheckOutDate(date)}
                className="form-input w-full"
                minDate={checkInDate}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guests & Rooms
              </label>
              <div className="flex">
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="form-select w-1/2 mr-2"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
                
                <select
                  value={rooms}
                  onChange={(e) => setRooms(parseInt(e.target.value))}
                  className="form-select w-1/2"
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                'Search Hotels'
              )}
            </button>
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
      {!loading && sortedHotels.length > 0 && (
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
                  max="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              {/* Star Rating Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Star Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <label key={stars} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.starRating.includes(stars)}
                        onChange={() => handleFilterChange('starRating', stars)}
                        className="mr-2"
                      />
                      <div className="flex">
                        {[...Array(stars)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 mr-0.5" />
                        ))}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Hotel Chain Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Hotel Chain</h3>
                <div className="space-y-2">
                  {['Marriott', 'Hilton', 'Hyatt', 'IHG', 'Accor'].map(chain => (
                    <label key={chain} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.chains.includes(chain)}
                        onChange={() => handleFilterChange('chains', chain)}
                        className="mr-2"
                      />
                      {chain}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Amenities Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Amenities</h3>
                <div className="space-y-2">
                  {['Free Wi-Fi', 'Pool', 'Fitness Center', 'Restaurant', 'Parking', 'Business Center', 'Spa'].map(amenity => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => handleFilterChange('amenities', amenity)}
                        className="mr-2"
                      />
                      {amenity}
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
                <span className="text-gray-600">{sortedHotels.length} hotels available</span>
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
                  <option value="rating">Guest Rating</option>
                  <option value="stars">Star Rating</option>
                  <option value="distance">Distance from Center</option>
                </select>
              </div>
            </div>
            
            {/* Hotel Listings */}
            <div>
              {sortedHotels.map(hotel => {
                const { compliant, violations } = checkPolicyCompliance('hotel', hotel);
                
                return (
                  <div 
                    key={hotel.id} 
                    className={`card mb-4 border-2 transition-all ${tripData.hotel && tripData.hotel.id === hotel.id ? 'border-primary-500' : 'border-transparent hover:border-primary-200'}`}
                  >
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
                            <p className="text-sm text-gray-500">{hotel.address}</p>
                            <div className="flex items-center mt-1">
                              {[...Array(hotel.starRating)].map((_, i) => (
                                <FaStar key={i} className="text-yellow-400 mr-0.5" />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">{hotel.chain}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary-700">${hotel.price}<span className="text-sm font-normal text-gray-500">/night</span></div>
                            <div className="text-sm text-gray-500">${hotel.totalPrice} total for {nights} nights</div>
                          </div>
                        </div>
                        
                        {/* Amenities */}
                        <div className="mt-3">
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Amenities</h4>
                          <div className="flex flex-wrap gap-2">
                            {hotel.amenities.slice(0, 5).map((amenity, index) => (
                              <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs">
                                <span className="mr-1">{amenityIcons[amenity] || <FaHotel />}</span>
                                <span>{amenity}</span>
                              </div>
                            ))}
                            {hotel.amenities.length > 5 && (
                              <div className="bg-gray-100 px-2 py-1 rounded-md text-xs">
                                +{hotel.amenities.length - 5} more
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Rating and Action */}
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="bg-primary-600 text-white font-bold rounded px-2 py-1 text-sm mr-2">
                              {hotel.rating || 4.5}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Very Good</span>
                              <span className="text-gray-500 ml-1">{hotel.reviewCount || 1245} reviews</span>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => handleSelectHotel(hotel)}
                            className={`btn ${tripData.hotel && tripData.hotel.id === hotel.id ? 'btn-success' : 'btn-primary'}`}
                          >
                            {tripData.hotel && tripData.hotel.id === hotel.id ? 'Selected' : 'Select'}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Policy Compliance Alert */}
                    {!compliant && <PolicyViolationAlert violations={violations} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <FaSpinner className="animate-spin text-primary-600 text-4xl mb-4" />
          <p className="text-gray-600">Searching for the best hotels...</p>
        </div>
      )}
      
      {/* No Results */}
      {!loading && sortedHotels.length === 0 && !error && (
        <div className="card py-12">
          <div className="text-center">
            <FaHotel className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
            <button 
              onClick={() => {
                setFilters({
                  priceRange: [0, 500],
                  starRating: [],
                  amenities: [],
                  chains: []
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

export default HotelSearch;
