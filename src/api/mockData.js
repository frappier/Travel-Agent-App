// Mock data for flights
export const mockFlights = [
  {
    id: 'f1',
    airline: 'Delta',
    flightNumber: 'DL1234',
    departureAirport: 'JFK',
    departureCity: 'New York',
    arrivalAirport: 'LAX',
    arrivalCity: 'Los Angeles',
    departureTime: '2023-08-15T08:30:00',
    arrivalTime: '2023-08-15T11:45:00',
    duration: '5h 15m',
    stops: 0,
    price: 450,
    cabinClass: 'Economy',
    seatsAvailable: 12,
    refundable: false,
    logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'f2',
    airline: 'United',
    flightNumber: 'UA789',
    departureAirport: 'JFK',
    departureCity: 'New York',
    arrivalAirport: 'LAX',
    arrivalCity: 'Los Angeles',
    departureTime: '2023-08-15T10:15:00',
    arrivalTime: '2023-08-15T13:45:00',
    duration: '5h 30m',
    stops: 0,
    price: 425,
    cabinClass: 'Economy',
    seatsAvailable: 8,
    refundable: true,
    logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'f3',
    airline: 'American',
    flightNumber: 'AA456',
    departureAirport: 'JFK',
    departureCity: 'New York',
    arrivalAirport: 'LAX',
    arrivalCity: 'Los Angeles',
    departureTime: '2023-08-15T12:00:00',
    arrivalTime: '2023-08-15T15:30:00',
    duration: '5h 30m',
    stops: 0,
    price: 410,
    cabinClass: 'Economy',
    seatsAvailable: 5,
    refundable: false,
    logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'f4',
    airline: 'JetBlue',
    flightNumber: 'B6789',
    departureAirport: 'JFK',
    departureCity: 'New York',
    arrivalAirport: 'LAX',
    arrivalCity: 'Los Angeles',
    departureTime: '2023-08-15T14:30:00',
    arrivalTime: '2023-08-15T18:15:00',
    duration: '5h 45m',
    stops: 0,
    price: 390,
    cabinClass: 'Economy',
    seatsAvailable: 15,
    refundable: true,
    logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'f5',
    airline: 'Delta',
    flightNumber: 'DL555',
    departureAirport: 'JFK',
    departureCity: 'New York',
    arrivalAirport: 'LAX',
    arrivalCity: 'Los Angeles',
    departureTime: '2023-08-15T16:45:00',
    arrivalTime: '2023-08-15T20:15:00',
    duration: '5h 30m',
    stops: 1,
    stopAirports: ['DFW'],
    price: 375,
    cabinClass: 'Economy',
    seatsAvailable: 3,
    refundable: false,
    logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'f6',
    airline: 'Southwest',
    flightNumber: 'WN123',
    departureAirport: 'JFK',
    departureCity: 'New York',
    arrivalAirport: 'LAX',
    arrivalCity: 'Los Angeles',
    departureTime: '2023-08-15T07:00:00',
    arrivalTime: '2023-08-15T10:45:00',
    duration: '5h 45m',
    stops: 1,
    stopAirports: ['MDW'],
    price: 350,
    cabinClass: 'Economy',
    seatsAvailable: 20,
    refundable: true,
    logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'f7',
    airline: 'Alaska',
    flightNumber: 'AS789',
    departureAirport: 'JFK',
    departureCity: 'New York',
    arrivalAirport: 'LAX',
    arrivalCity: 'Los Angeles',
    departureTime: '2023-08-15T11:30:00',
    arrivalTime: '2023-08-15T15:00:00',
    duration: '5h 30m',
    stops: 0,
    price: 430,
    cabinClass: 'Economy',
    seatsAvailable: 7,
    refundable: false,
    logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'f8',
    airline: 'United',
    flightNumber: 'UA999',
    departureAirport: 'JFK',
    departureCity: 'New York',
    arrivalAirport: 'LAX',
    arrivalCity: 'Los Angeles',
    departureTime: '2023-08-15T18:30:00',
    arrivalTime: '2023-08-15T22:00:00',
    duration: '5h 30m',
    stops: 0,
    price: 1200,
    cabinClass: 'Business',
    seatsAvailable: 4,
    refundable: true,
    logo: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Mock data for hotels
export const mockHotels = [
  {
    id: 'h1',
    name: 'Marriott Downtown',
    chain: 'Marriott',
    address: '123 Main St, Los Angeles, CA 90001',
    starRating: 4,
    price: 220,
    totalPrice: 660, // 3 nights
    amenities: ['Free Wi-Fi', 'Pool', 'Fitness Center', 'Restaurant', 'Business Center'],
    distance: 2.5,
    availableRooms: 5,
    refundable: true,
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'h2',
    name: 'Hilton Garden Inn',
    chain: 'Hilton',
    address: '456 Oak Ave, Los Angeles, CA 90002',
    starRating: 3.5,
    price: 180,
    totalPrice: 540, // 3 nights
    amenities: ['Free Wi-Fi', 'Fitness Center', 'Restaurant'],
    distance: 3.2,
    availableRooms: 8,
    refundable: true,
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'h3',
    name: 'Hyatt Regency',
    chain: 'Hyatt',
    address: '789 Pine Blvd, Los Angeles, CA 90003',
    starRating: 4.5,
    price: 250,
    totalPrice: 750, // 3 nights
    amenities: ['Free Wi-Fi', 'Pool', 'Spa', 'Fitness Center', 'Restaurant', 'Bar'],
    distance: 1.8,
    availableRooms: 3,
    refundable: false,
    image: 'https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'h4',
    name: 'Courtyard by Marriott',
    chain: 'Marriott',
    address: '321 Elm St, Los Angeles, CA 90004',
    starRating: 3,
    price: 160,
    totalPrice: 480, // 3 nights
    amenities: ['Free Wi-Fi', 'Fitness Center', 'Business Center'],
    distance: 4.5,
    availableRooms: 12,
    refundable: true,
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'h5',
    name: 'The Ritz-Carlton',
    chain: 'Marriott',
    address: '555 Luxury Lane, Los Angeles, CA 90005',
    starRating: 5,
    price: 450,
    totalPrice: 1350, // 3 nights
    amenities: ['Free Wi-Fi', 'Pool', 'Spa', 'Fitness Center', 'Restaurant', 'Bar', 'Concierge', 'Room Service'],
    distance: 1.2,
    availableRooms: 2,
    refundable: false,
    image: 'https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'h6',
    name: 'DoubleTree by Hilton',
    chain: 'Hilton',
    address: '888 Harbor Dr, Los Angeles, CA 90006',
    starRating: 3.5,
    price: 190,
    totalPrice: 570, // 3 nights
    amenities: ['Free Wi-Fi', 'Pool', 'Fitness Center', 'Restaurant'],
    distance: 3.8,
    availableRooms: 7,
    refundable: true,
    image: 'https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Mock data for car rentals
export const mockCarRentals = [
  {
    id: 'c1',
    vendor: 'Enterprise',
    carType: 'Economy',
    model: 'Toyota Yaris or similar',
    price: 45,
    totalPrice: 135, // 3 days
    features: ['Automatic', 'A/C', '4 doors', '5 passengers', 'Unlimited mileage'],
    pickupLocation: 'LAX Airport',
    availableCars: 8,
    refundable: true,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'c2',
    vendor: 'Hertz',
    carType: 'Compact',
    model: 'Ford Focus or similar',
    price: 50,
    totalPrice: 150, // 3 days
    features: ['Automatic', 'A/C', '4 doors', '5 passengers', 'Unlimited mileage'],
    pickupLocation: 'LAX Airport',
    availableCars: 5,
    refundable: false,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'c3',
    vendor: 'Avis',
    carType: 'Mid-size',
    model: 'Toyota Camry or similar',
    price: 65,
    totalPrice: 195, // 3 days
    features: ['Automatic', 'A/C', '4 doors', '5 passengers', 'Unlimited mileage', 'Bluetooth'],
    pickupLocation: 'LAX Airport',
    availableCars: 3,
    refundable: true,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'c4',
    vendor: 'Budget',
    carType: 'Standard',
    model: 'Volkswagen Jetta or similar',
    price: 60,
    totalPrice: 180, // 3 days
    features: ['Automatic', 'A/C', '4 doors', '5 passengers', 'Unlimited mileage', 'Bluetooth'],
    pickupLocation: 'LAX Airport',
    availableCars: 6,
    refundable: true,
    image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'c5',
    vendor: 'Enterprise',
    carType: 'SUV',
    model: 'Ford Escape or similar',
    price: 85,
    totalPrice: 255, // 3 days
    features: ['Automatic', 'A/C', '4 doors', '5 passengers', 'Unlimited mileage', 'Bluetooth', 'Navigation'],
    pickupLocation: 'LAX Airport',
    availableCars: 2,
    refundable: false,
    image: 'https://images.pexels.com/photos/2920064/pexels-photo-2920064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'c6',
    vendor: 'Hertz',
    carType: 'Luxury',
    model: 'BMW 3 Series or similar',
    price: 120,
    totalPrice: 360, // 3 days
    features: ['Automatic', 'A/C', '4 doors', '5 passengers', 'Unlimited mileage', 'Bluetooth', 'Navigation', 'Leather seats'],
    pickupLocation: 'LAX Airport',
    availableCars: 1,
    refundable: true,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// List of airports for search
export const airports = [
  { value: 'JFK', label: 'New York (JFK) - John F. Kennedy International' },
  { value: 'LAX', label: 'Los Angeles (LAX) - Los Angeles International' },
  { value: 'ORD', label: 'Chicago (ORD) - O\'Hare International' },
  { value: 'ATL', label: 'Atlanta (ATL) - Hartsfield-Jackson Atlanta International' },
  { value: 'DFW', label: 'Dallas (DFW) - Dallas/Fort Worth International' },
  { value: 'DEN', label: 'Denver (DEN) - Denver International' },
  { value: 'SFO', label: 'San Francisco (SFO) - San Francisco International' },
  { value: 'SEA', label: 'Seattle (SEA) - Seattle-Tacoma International' },
  { value: 'MIA', label: 'Miami (MIA) - Miami International' },
  { value: 'BOS', label: 'Boston (BOS) - Boston Logan International' },
  { value: 'LAS', label: 'Las Vegas (LAS) - Harry Reid International' },
  { value: 'CLT', label: 'Charlotte (CLT) - Charlotte Douglas International' },
  { value: 'PHX', label: 'Phoenix (PHX) - Phoenix Sky Harbor International' },
  { value: 'IAH', label: 'Houston (IAH) - George Bush Intercontinental' },
  { value: 'MCO', label: 'Orlando (MCO) - Orlando International' }
];

// List of cities for hotel search
export const cities = [
  { value: 'NYC', label: 'New York City, NY' },
  { value: 'LAX', label: 'Los Angeles, CA' },
  { value: 'CHI', label: 'Chicago, IL' },
  { value: 'ATL', label: 'Atlanta, GA' },
  { value: 'DAL', label: 'Dallas, TX' },
  { value: 'DEN', label: 'Denver, CO' },
  { value: 'SFO', label: 'San Francisco, CA' },
  { value: 'SEA', label: 'Seattle, WA' },
  { value: 'MIA', label: 'Miami, FL' },
  { value: 'BOS', label: 'Boston, MA' },
  { value: 'LAS', label: 'Las Vegas, NV' },
  { value: 'CLT', label: 'Charlotte, NC' },
  { value: 'PHX', label: 'Phoenix, AZ' },
  { value: 'HOU', label: 'Houston, TX' },
  { value: 'ORL', label: 'Orlando, FL' }
];

// Mock API functions
export const searchFlights = (params) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Filter flights based on search parameters
      let results = [...mockFlights];
      
      // Apply filters if provided
      if (params.departureAirport) {
        results = results.filter(flight => flight.departureAirport === params.departureAirport);
      }
      
      if (params.arrivalAirport) {
        results = results.filter(flight => flight.arrivalAirport === params.arrivalAirport);
      }
      
      if (params.cabinClass) {
        results = results.filter(flight => flight.cabinClass === params.cabinClass);
      }
      
      if (params.maxPrice) {
        results = results.filter(flight => flight.price <= params.maxPrice);
      }
      
      if (params.directOnly) {
        results = results.filter(flight => flight.stops === 0);
      }
      
      resolve(results);
    }, 1000);
  });
};

export const searchHotels = (params) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Filter hotels based on search parameters
      let results = [...mockHotels];
      
      if (params.maxPrice) {
        results = results.filter(hotel => hotel.price <= params.maxPrice);
      }
      
      if (params.minStarRating) {
        results = results.filter(hotel => hotel.starRating >= params.minStarRating);
      }
      
      if (params.maxDistance) {
        results = results.filter(hotel => hotel.distance <= params.maxDistance);
      }
      
      if (params.chain && params.chain.length > 0) {
        results = results.filter(hotel => params.chain.includes(hotel.chain));
      }
      
      resolve(results);
    }, 1000);
  });
};

export const searchCarRentals = (params) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Filter car rentals based on search parameters
      let results = [...mockCarRentals];
      
      if (params.maxPrice) {
        results = results.filter(car => car.price <= params.maxPrice);
      }
      
      if (params.carType && params.carType.length > 0) {
        results = results.filter(car => params.carType.includes(car.carType));
      }
      
      if (params.vendor && params.vendor.length > 0) {
        results = results.filter(car => params.vendor.includes(car.vendor));
      }
      
      resolve(results);
    }, 1000);
  });
};
