import { mockFlights, mockHotels, mockCarRentals, searchFlights, searchHotels, searchCarRentals } from './mockData';

/**
 * API Service for the Travel Booking Application
 * 
 * This service provides methods to interact with flight, hotel, and car rental data.
 * Currently using mock data, but can be easily replaced with real API calls.
 */

// Flight API methods
export const flightApi = {
  /**
   * Search for flights based on search criteria
   * @param {Object} params - Search parameters
   * @returns {Promise} - Promise resolving to flight search results
   */
  search: async (params) => {
    try {
      // In a real app, this would be an API call to a flight search service
      // return await axios.get('/api/flights/search', { params });
      
      // Using mock data for now
      const results = await searchFlights(params);
      return { success: true, data: results };
    } catch (error) {
      console.error('Error searching flights:', error);
      return { success: false, error: error.message || 'Failed to search flights' };
    }
  },
  
  /**
   * Get flight details by ID
   * @param {string} id - Flight ID
   * @returns {Promise} - Promise resolving to flight details
   */
  getById: async (id) => {
    try {
      // In a real app, this would be an API call to get flight details
      // return await axios.get(`/api/flights/${id}`);
      
      // Using mock data for now
      const flight = mockFlights.find(flight => flight.id === id);
      if (!flight) {
        throw new Error('Flight not found');
      }
      return { success: true, data: flight };
    } catch (error) {
      console.error('Error getting flight details:', error);
      return { success: false, error: error.message || 'Failed to get flight details' };
    }
  },
  
  /**
   * Book a flight
   * @param {Object} bookingData - Flight booking data
   * @returns {Promise} - Promise resolving to booking confirmation
   */
  book: async (bookingData) => {
    try {
      // In a real app, this would be an API call to book a flight
      // return await axios.post('/api/flights/book', bookingData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { 
        success: true, 
        data: {
          bookingId: 'FLT' + Math.floor(Math.random() * 1000000),
          status: 'confirmed',
          ...bookingData
        }
      };
    } catch (error) {
      console.error('Error booking flight:', error);
      return { success: false, error: error.message || 'Failed to book flight' };
    }
  }
};

// Hotel API methods
export const hotelApi = {
  /**
   * Search for hotels based on search criteria
   * @param {Object} params - Search parameters
   * @returns {Promise} - Promise resolving to hotel search results
   */
  search: async (params) => {
    try {
      // In a real app, this would be an API call to a hotel search service
      // return await axios.get('/api/hotels/search', { params });
      
      // Using mock data for now
      const results = await searchHotels(params);
      return { success: true, data: results };
    } catch (error) {
      console.error('Error searching hotels:', error);
      return { success: false, error: error.message || 'Failed to search hotels' };
    }
  },
  
  /**
   * Get hotel details by ID
   * @param {string} id - Hotel ID
   * @returns {Promise} - Promise resolving to hotel details
   */
  getById: async (id) => {
    try {
      // In a real app, this would be an API call to get hotel details
      // return await axios.get(`/api/hotels/${id}`);
      
      // Using mock data for now
      const hotel = mockHotels.find(hotel => hotel.id === id);
      if (!hotel) {
        throw new Error('Hotel not found');
      }
      return { success: true, data: hotel };
    } catch (error) {
      console.error('Error getting hotel details:', error);
      return { success: false, error: error.message || 'Failed to get hotel details' };
    }
  },
  
  /**
   * Book a hotel
   * @param {Object} bookingData - Hotel booking data
   * @returns {Promise} - Promise resolving to booking confirmation
   */
  book: async (bookingData) => {
    try {
      // In a real app, this would be an API call to book a hotel
      // return await axios.post('/api/hotels/book', bookingData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { 
        success: true, 
        data: {
          bookingId: 'HTL' + Math.floor(Math.random() * 1000000),
          status: 'confirmed',
          ...bookingData
        }
      };
    } catch (error) {
      console.error('Error booking hotel:', error);
      return { success: false, error: error.message || 'Failed to book hotel' };
    }
  }
};

// Car Rental API methods
export const carRentalApi = {
  /**
   * Search for car rentals based on search criteria
   * @param {Object} params - Search parameters
   * @returns {Promise} - Promise resolving to car rental search results
   */
  search: async (params) => {
    try {
      // In a real app, this would be an API call to a car rental search service
      // return await axios.get('/api/cars/search', { params });
      
      // Using mock data for now
      const results = await searchCarRentals(params);
      return { success: true, data: results };
    } catch (error) {
      console.error('Error searching car rentals:', error);
      return { success: false, error: error.message || 'Failed to search car rentals' };
    }
  },
  
  /**
   * Get car rental details by ID
   * @param {string} id - Car rental ID
   * @returns {Promise} - Promise resolving to car rental details
   */
  getById: async (id) => {
    try {
      // In a real app, this would be an API call to get car rental details
      // return await axios.get(`/api/cars/${id}`);
      
      // Using mock data for now
      const car = mockCarRentals.find(car => car.id === id);
      if (!car) {
        throw new Error('Car rental not found');
      }
      return { success: true, data: car };
    } catch (error) {
      console.error('Error getting car rental details:', error);
      return { success: false, error: error.message || 'Failed to get car rental details' };
    }
  },
  
  /**
   * Book a car rental
   * @param {Object} bookingData - Car rental booking data
   * @returns {Promise} - Promise resolving to booking confirmation
   */
  book: async (bookingData) => {
    try {
      // In a real app, this would be an API call to book a car rental
      // return await axios.post('/api/cars/book', bookingData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { 
        success: true, 
        data: {
          bookingId: 'CAR' + Math.floor(Math.random() * 1000000),
          status: 'confirmed',
          ...bookingData
        }
      };
    } catch (error) {
      console.error('Error booking car rental:', error);
      return { success: false, error: error.message || 'Failed to book car rental' };
    }
  }
};

// Trip API methods
export const tripApi = {
  /**
   * Submit a complete trip booking
   * @param {Object} tripData - Complete trip data including traveler, flight, hotel, and car
   * @returns {Promise} - Promise resolving to trip booking confirmation
   */
  submit: async (tripData) => {
    try {
      // In a real app, this would be an API call to submit the trip
      // return await axios.post('/api/trips', tripData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return { 
        success: true, 
        data: {
          tripId: 'TRP' + Math.floor(Math.random() * 1000000),
          bookingDate: new Date().toISOString(),
          status: 'confirmed',
          ...tripData
        }
      };
    } catch (error) {
      console.error('Error submitting trip:', error);
      return { success: false, error: error.message || 'Failed to submit trip' };
    }
  },
  
  /**
   * Get trip history for a user
   * @param {string} userId - User ID
   * @returns {Promise} - Promise resolving to trip history
   */
  getHistory: async (userId) => {
    try {
      // In a real app, this would be an API call to get trip history
      // return await axios.get(`/api/trips/history/${userId}`);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock trip history data
      const mockHistory = [
        {
          tripId: 'TRP123456',
          bookingDate: '2023-07-15T10:30:00',
          status: 'completed',
          traveler: {
            name: 'John Doe',
            email: 'john.doe@example.com'
          },
          flight: {
            airline: 'Delta',
            flightNumber: 'DL1234',
            departureDate: 'Jul 20, 2023',
            returnDate: 'Jul 25, 2023',
            price: 450
          },
          hotel: {
            name: 'Marriott Downtown',
            checkInDate: 'Jul 20, 2023',
            checkOutDate: 'Jul 25, 2023',
            nights: 5,
            price: 220,
            totalPrice: 1100
          },
          car: {
            vendor: 'Hertz',
            model: 'Toyota Camry',
            carType: 'Mid-size',
            price: 65,
            totalPrice: 325
          }
        },
        {
          tripId: 'TRP789012',
          bookingDate: '2023-06-10T14:15:00',
          status: 'completed',
          traveler: {
            name: 'John Doe',
            email: 'john.doe@example.com'
          },
          flight: {
            airline: 'United',
            flightNumber: 'UA789',
            departureDate: 'Jun 15, 2023',
            returnDate: 'Jun 18, 2023',
            price: 380
          },
          hotel: {
            name: 'Hilton Garden Inn',
            checkInDate: 'Jun 15, 2023',
            checkOutDate: 'Jun 18, 2023',
            nights: 3,
            price: 180,
            totalPrice: 540
          },
          car: {
            vendor: 'Enterprise',
            model: 'Ford Focus',
            carType: 'Compact',
            price: 55,
            totalPrice: 165
          }
        }
      ];
      
      return { success: true, data: mockHistory };
    } catch (error) {
      console.error('Error getting trip history:', error);
      return { success: false, error: error.message || 'Failed to get trip history' };
    }
  }
};
