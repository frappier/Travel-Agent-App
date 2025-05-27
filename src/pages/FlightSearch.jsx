import { useState, useEffect } from 'react';
import { FaPlane, FaFilter, FaSort, FaExchangeAlt, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { useTripContext } from '../contexts/TripContext';
import { usePolicyContext } from '../contexts/PolicyContext';
import DatePicker from 'react-datepicker';
import { format, addDays } from 'date-fns';
import { flightApi } from '../api/apiService';
import { airports } from '../api/mockData';
import PolicyViolationAlert from '../components/PolicyViolationAlert';
import Select from 'react-select';

const FlightSearch = () => {
  const { tripData, selectFlight } = useTripContext();
  const { checkPolicyCompliance } = usePolicyContext();
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(addDays(new Date(), 7));
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [filters, setFilters] = useState({
    airlines: [],
    priceRange: [0, 2000],
    stops: 'any',
    departureTime: 'any',
    arrivalTime: 'any'
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Search for flights
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    if (!origin || !destination) {
      setError('Please select both origin and destination airports');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const searchParams = {
        departureAirport: origin.value,
        arrivalAirport: destination.value,
        departureDate: format(departureDate, 'yyyy-MM-dd'),
        returnDate: format(returnDate, 'yyyy-MM-dd'),
        passengers,
        cabinClass,
        directOnly: filters.stops === 'nonstop',
        maxPrice: filters.priceRange[1]
      };
      
      const response = await flightApi.search(searchParams);
      
      if (response.success) {
        setFlights(response.data);
      } else {
        setError(response.error || 'Failed to search flights');
      }
    } catch (err) {
      setError('An error occurred while searching for flights');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Apply filters to flight results
  const getFilteredFlights = () => {
    if (!flights.length) return [];
    
    return flights.filter(flight => {
      // Filter by airline
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) {
        return false;
      }
      
      // Filter by price
      if (flight.price < filters.priceRange[0] || flight.price > filters.priceRange[1]) {
        return false;
      }
      
      // Filter by stops
      if (filters.stops === 'nonstop' && flight.stops > 0) {
        return false;
      } else if (filters.stops === '1stop' && flight.stops > 1) {
        return false;
      }
      
      // Filter by departure time
      if (filters.departureTime !== 'any') {
        const hour = parseInt(flight.departureTime.split(':')[0]);
        
        if (filters.departureTime === 'morning' && (hour < 5 || hour >= 12)) {
          return false;
        } else if (filters.departureTime === 'afternoon' && (hour < 12 || hour >= 18)) {
          return false;
        } else if (filters.departureTime === 'evening' && (hour < 18 || hour >= 24)) {
          return false;
        }
      }
      
      return true;
    });
  };
  
  // Sort filtered flights
  const getSortedFlights = () => {
    const filteredFlights = getFilteredFlights();
    
    if (sortBy === 'price-low') {
      return [...filteredFlights].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      return [...filteredFlights].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'duration') {
      return [...filteredFlights].sort((a, b) => {
        const durationA = a.duration.replace('h ', '').replace('m', '');
        const durationB = b.duration.replace('h ', '').replace('m', '');
        return durationA - durationB;
      });
    } else if (sortBy === 'departure') {
      return [...filteredFlights].sort((a, b) => {
        const timeA = a.departureTime;
        const timeB = b.departureTime;
        return timeA.localeCompare(timeB);
      });
    } else if (sortBy === 'arrival') {
      return [...filteredFlights].sort((a, b) => {
        const timeA = a.arrivalTime;
        const timeB = b.arrivalTime;
        return timeA.localeCompare(timeB);
      });
    }
    
    // Default: recommended
    return filteredFlights;
  };
  
  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (category === 'airlines') {
        if (newFilters.airlines.includes(value)) {
          newFilters.airlines = newFilters.airlines.filter(airline => airline !== value);
        } else {
          newFilters.airlines = [...newFilters.airlines, value];
        }
      } else {
        newFilters[category] = value;
      }
      
      return newFilters;
    });
  };
  
  const handleSelectFlight = (flight) => {
    selectFlight({
      ...flight,
      departureDate: format(departureDate, 'MMM dd, yyyy'),
      returnDate: format(returnDate, 'MMM dd, yyyy')
    });
  };
  
  // Swap origin and destination
  const handleSwapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };
  
  // Load initial flights on component mount
  useEffect(() => {
    if (airports.length > 0) {
      setOrigin({ value: 'JFK', label: 'New York (JFK) - John F. Kennedy International' });
      setDestination({ value: 'LAX', label: 'Los Angeles (LAX) - Los Angeles International' });
    }
  }, []);
  
  // Search for flights when origin and destination are set
  useEffect(() => {
    if (origin && destination) {
      handleSearch();
    }
  }, [origin, destination]);
  
  const sortedFlights = getSortedFlights();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Flight Search</h1>
        <p className="text-gray-600">Find and book flights for your business trip</p>
      </div>
      
      {/* Search Form */}
      <div className="card mb-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Origin
              </label>
              <Select
                value={origin}
                onChange={setOrigin}
                options={airports}
                placeholder="Select departure airport"
                className="basic-select"
                classNamePrefix="select"
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <div className="flex items-center">
                <div className="flex-grow">
                  <Select
                    value={destination}
                    onChange={setDestination}
                    options={airports}
                    placeholder="Select arrival airport"
                    className="basic-select"
                    classNamePrefix="select"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleSwapLocations}
                  className="ml-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <FaExchangeAlt className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline mr-1" /> Departure Date
              </label>
              <DatePicker
                selected={departureDate}
                onChange={date => setDepartureDate(date)}
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
                minDate={departureDate}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passengers
              </label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="form-select"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cabin Class
              </label>
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="form-select"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                'Search Flights'
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
      {!loading && sortedFlights.length > 0 && (
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
                  max="2000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              {/* Stops Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Stops</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stops"
                      checked={filters.stops === 'any'}
                      onChange={() => handleFilterChange('stops', 'any')}
                      className="mr-2"
                    />
                    Any
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stops"
                      checked={filters.stops === 'nonstop'}
                      onChange={() => handleFilterChange('stops', 'nonstop')}
                      className="mr-2"
                    />
                    Nonstop only
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stops"
                      checked={filters.stops === '1stop'}
                      onChange={() => handleFilterChange('stops', '1stop')}
                      className="mr-2"
                    />
                    1 stop max
                  </label>
                </div>
              </div>
              
              {/* Airlines Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Airlines</h3>
                <div className="space-y-2">
                  {['Delta', 'United', 'American', 'JetBlue', 'Southwest', 'Alaska'].map(airline => (
                    <label key={airline} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.airlines.includes(airline)}
                        onChange={() => handleFilterChange('airlines', airline)}
                        className="mr-2"
                      />
                      {airline}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Departure Time Filter */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Departure Time</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departureTime"
                      checked={filters.departureTime === 'any'}
                      onChange={() => handleFilterChange('departureTime', 'any')}
                      className="mr-2"
                    />
                    Any time
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departureTime"
                      checked={filters.departureTime === 'morning'}
                      onChange={() => handleFilterChange('departureTime', 'morning')}
                      className="mr-2"
                    />
                    Morning (5am - 12pm)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departureTime"
                      checked={filters.departureTime === 'afternoon'}
                      onChange={() => handleFilterChange('departureTime', 'afternoon')}
                      className="mr-2"
                    />
                    Afternoon (12pm - 6pm)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="departureTime"
                      checked={filters.departureTime === 'evening'}
                      onChange={() => handleFilterChange('departureTime', 'evening')}
                      className="mr-2"
                    />
                    Evening (6pm - 5am)
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results List */}
          <div className={`${showFilters ? 'hidden' : 'block'} md:block md:w-3/4`}>
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-gray-600">{sortedFlights.length} flights available</span>
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
                  <option value="duration">Duration</option>
                  <option value="departure">Departure Time</option>
                  <option value="arrival">Arrival Time</option>
                </select>
              </div>
            </div>
            
            {/* Flight Listings */}
            <div>
              {sortedFlights.map(flight => {
                const { compliant, violations } = checkPolicyCompliance('flight', flight);
                
                return (
                  <div 
                    key={flight.id} 
                    className={`card mb-4 border-2 transition-all ${tripData.flight && tripData.flight.id === flight.id ? 'border-primary-500' : 'border-transparent hover:border-primary-200'}`}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Airline Info */}
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
                            <FaPlane className="text-primary-600" />
                          </div>
                          <div>
                            <div className="font-medium">{flight.airline}</div>
                            <div className="text-sm text-gray-500">{flight.flightNumber}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}
                          {flight.stops > 0 && flight.stopAirports && (
                            <span className="block text-xs text-gray-500">
                              via {flight.stopAirports.join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Flight Times */}
                      <div className="md:w-2/4 mb-4 md:mb-0">
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <div className="text-lg font-semibold">{flight.departureTime}</div>
                            <div className="text-sm text-gray-500">{flight.departureAirport}</div>
                          </div>
                          
                          <div className="flex flex-col items-center px-4">
                            <div className="text-xs text-gray-500 mb-1">{flight.duration}</div>
                            <div className="w-24 h-px bg-gray-300 relative">
                              <div className="absolute -top-1 right-0 w-2 h-2 bg-gray-300 transform rotate-45"></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {flight.cabinClass}
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-lg font-semibold">{flight.arrivalTime}</div>
                            <div className="text-sm text-gray-500">{flight.arrivalAirport}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price and Action */}
                      <div className="md:w-1/4 flex flex-col items-end justify-between">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-700">${flight.price}</div>
                          <div className="text-sm text-gray-500">per person</div>
                        </div>
                        
                        <div className="mt-4">
                          <button 
                            onClick={() => handleSelectFlight(flight)}
                            className={`btn ${tripData.flight && tripData.flight.id === flight.id ? 'btn-success' : 'btn-primary'}`}
                          >
                            {tripData.flight && tripData.flight.id === flight.id ? 'Selected' : 'Select'}
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
          <p className="text-gray-600">Searching for the best flights...</p>
        </div>
      )}
      
      {/* No Results */}
      {!loading && sortedFlights.length === 0 && !error && (
        <div className="card py-12">
          <div className="text-center">
            <FaPlane className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No flights found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
            <button 
              onClick={() => {
                setFilters({
                  airlines: [],
                  priceRange: [0, 2000],
                  stops: 'any',
                  departureTime: 'any',
                  arrivalTime: 'any'
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

export default FlightSearch;
