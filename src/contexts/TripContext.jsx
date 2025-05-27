import { createContext, useContext, useState } from 'react';

const TripContext = createContext();

export const useTripContext = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    traveler: {
      name: '',
      email: '',
      phone: '',
      department: '',
      employeeId: ''
    },
    flight: null,
    hotel: null,
    car: null
  });
  
  const updateTravelerInfo = (travelerInfo) => {
    setTripData(prev => ({
      ...prev,
      traveler: {
        ...prev.traveler,
        ...travelerInfo
      }
    }));
  };
  
  const selectFlight = (flight) => {
    setTripData(prev => ({
      ...prev,
      flight
    }));
  };
  
  const selectHotel = (hotel) => {
    setTripData(prev => ({
      ...prev,
      hotel
    }));
  };
  
  const selectCar = (car) => {
    setTripData(prev => ({
      ...prev,
      car
    }));
  };
  
  const clearTrip = () => {
    setTripData({
      traveler: {
        name: '',
        email: '',
        phone: '',
        department: '',
        employeeId: ''
      },
      flight: null,
      hotel: null,
      car: null
    });
  };
  
  return (
    <TripContext.Provider value={{
      tripData,
      updateTravelerInfo,
      selectFlight,
      selectHotel,
      selectCar,
      clearTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};
