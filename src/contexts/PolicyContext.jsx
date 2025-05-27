import { createContext, useContext, useState } from 'react';

const PolicyContext = createContext();

export const usePolicyContext = () => useContext(PolicyContext);

export const PolicyProvider = ({ children }) => {
  const [policies, setPolicies] = useState({
    flight: {
      maxPrice: 1000,
      preferredAirlines: ['Delta', 'United', 'American'],
      cabinClass: 'Economy',
      advancedBooking: 14, // days
      directFlightsOnly: false
    },
    hotel: {
      maxNightlyRate: 250,
      preferredChains: ['Marriott', 'Hilton', 'Hyatt'],
      maxStarRating: 4,
      amenities: ['WiFi', 'Breakfast']
    },
    car: {
      maxDailyRate: 75,
      carTypes: ['Economy', 'Compact', 'Mid-size'],
      preferredVendors: ['Hertz', 'Enterprise', 'Avis']
    }
  });
  
  const updatePolicies = (category, newPolicies) => {
    setPolicies(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...newPolicies
      }
    }));
  };
  
  const checkPolicyCompliance = (category, item) => {
    if (!item) return { compliant: true, violations: [] };
    
    const violations = [];
    let compliant = true;
    
    if (category === 'flight') {
      const { maxPrice, preferredAirlines, cabinClass, directFlightsOnly } = policies.flight;
      
      if (item.price > maxPrice) {
        violations.push(`Exceeds maximum price of $${maxPrice}`);
        compliant = false;
      }
      
      if (!preferredAirlines.includes(item.airline)) {
        violations.push(`${item.airline} is not a preferred airline`);
        // Non-critical violation, still compliant
      }
      
      if (item.cabinClass !== cabinClass) {
        violations.push(`${item.cabinClass} is not the approved cabin class (${cabinClass})`);
        compliant = false;
      }
      
      if (directFlightsOnly && item.stops > 0) {
        violations.push('Only direct flights are approved');
        compliant = false;
      }
    }
    
    else if (category === 'hotel') {
      const { maxNightlyRate, preferredChains, maxStarRating } = policies.hotel;
      
      if (item.price > maxNightlyRate) {
        violations.push(`Exceeds maximum nightly rate of $${maxNightlyRate}`);
        compliant = false;
      }
      
      if (!preferredChains.includes(item.chain)) {
        violations.push(`${item.chain} is not a preferred hotel chain`);
        // Non-critical violation, still compliant
      }
      
      if (item.stars > maxStarRating) {
        violations.push(`${item.stars}-star rating exceeds maximum of ${maxStarRating} stars`);
        compliant = false;
      }
    }
    
    else if (category === 'car') {
      const { maxDailyRate, carTypes, preferredVendors } = policies.car;
      
      if (item.price > maxDailyRate) {
        violations.push(`Exceeds maximum daily rate of $${maxDailyRate}`);
        compliant = false;
      }
      
      if (!carTypes.includes(item.carType)) {
        violations.push(`${item.carType} is not an approved car type`);
        compliant = false;
      }
      
      if (!preferredVendors.includes(item.vendor)) {
        violations.push(`${item.vendor} is not a preferred vendor`);
        // Non-critical violation, still compliant
      }
    }
    
    return { compliant, violations };
  };
  
  return (
    <PolicyContext.Provider value={{
      policies,
      updatePolicies,
      checkPolicyCompliance
    }}>
      {children}
    </PolicyContext.Provider>
  );
};
