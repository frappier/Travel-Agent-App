import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaHotel, FaCar, FaUser, FaDownload, FaEdit, FaTrash, FaExclamationTriangle, FaCheck, FaSpinner } from 'react-icons/fa';
import { useTripContext } from '../contexts/TripContext';
import { usePolicyContext } from '../contexts/PolicyContext';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { tripApi } from '../api/apiService';

const TripSummary = () => {
  const { tripData, clearTrip } = useTripContext();
  const { checkPolicyCompliance } = usePolicyContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  
  // Check if all required components are selected
  const isComplete = () => {
    return (
      tripData.traveler.name && 
      tripData.traveler.email && 
      tripData.flight && 
      tripData.hotel && 
      tripData.car
    );
  };
  
  // Check if there are any policy violations
  const hasPolicyViolations = () => {
    const flightCompliance = tripData.flight ? checkPolicyCompliance('flight', tripData.flight) : { compliant: true };
    const hotelCompliance = tripData.hotel ? checkPolicyCompliance('hotel', tripData.hotel) : { compliant: true };
    const carCompliance = tripData.car ? checkPolicyCompliance('car', tripData.car) : { compliant: true };
    
    return !flightCompliance.compliant || !hotelCompliance.compliant || !carCompliance.compliant;
  };
  
  // Calculate total trip cost
  const calculateTotalCost = () => {
    let total = 0;
    
    if (tripData.flight) {
      total += tripData.flight.price;
    }
    
    if (tripData.hotel) {
      total += tripData.hotel.totalPrice;
    }
    
    if (tripData.car) {
      total += tripData.car.totalPrice;
    }
    
    return total;
  };
  
  const handleSubmitTrip = async () => {
    if (!isComplete()) {
      toast.error('Please complete all booking selections before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await tripApi.submit(tripData);
      
      if (response.success) {
        setBookingConfirmation(response.data);
        toast.success('Trip booked successfully!');
      } else {
        toast.error(response.error || 'Failed to book trip');
      }
    } catch (error) {
      console.error('Error submitting trip:', error);
      toast.error('An error occurred while booking your trip');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDownloadPDF = () => {
    const input = document.getElementById('trip-summary');
    
    toast.info('Generating PDF...');
    
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('trip-summary.pdf');
      
      toast.success('PDF downloaded successfully!');
    });
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Trip Summary</h1>
        <p className="text-gray-600">Review and submit your travel arrangements</p>
      </div>
      
      {/* Booking Confirmation */}
      {bookingConfirmation && (
        <div className="card mb-6 bg-green-50 border-green-500 border">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 rounded-full p-2 mr-3">
              <FaCheck className="text-white text-xl" />
            </div>
            <h2 className="text-xl font-semibold text-green-800">Booking Confirmed!</h2>
          </div>
          
          <div className="mb-4">
            <p className="text-green-700">Your trip has been successfully booked and confirmed.</p>
            <p className="text-green-700 font-medium mt-2">Confirmation Number: {bookingConfirmation.tripId}</p>
            <p className="text-green-700 text-sm mt-1">Booked on: {new Date(bookingConfirmation.bookingDate).toLocaleString()}</p>
          </div>
          
          <div className="bg-white p-4 rounded-md mb-4">
            <h3 className="font-medium text-gray-800 mb-2">Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Traveler</p>
                <p className="font-medium">{bookingConfirmation.traveler.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{bookingConfirmation.traveler.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Cost</p>
                <p className="font-medium">${calculateTotalCost()}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={handleDownloadPDF}
              className="btn btn-primary"
            >
              <FaDownload className="mr-2" />
              Download Confirmation
            </button>
          </div>
        </div>
      )}
      
      <div id="trip-summary">
        {/* Traveler Information */}
        <div className="card mb-6">
          <div className="flex items-center mb-4">
            <FaUser className="text-primary-600 text-xl mr-2" />
            <h2 className="text-xl font-semibold">Traveler Information</h2>
          </div>
          
          {tripData.traveler.name ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{tripData.traveler.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{tripData.traveler.email}</p>
              </div>
              
              {tripData.traveler.phone && (
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{tripData.traveler.phone}</p>
                </div>
              )}
              
              {tripData.traveler.department && (
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{tripData.traveler.department}</p>
                </div>
              )}
              
              {tripData.traveler.employeeId && (
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="font-medium">{tripData.traveler.employeeId}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Traveler information is required. 
                    <Link to="/" className="font-medium text-yellow-700 underline ml-1">
                      Add traveler information
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Flight Information */}
        <div className="card mb-6">
          <div className="flex items-center mb-4">
            <FaPlane className="text-primary-600 text-xl mr-2" />
            <h2 className="text-xl font-semibold">Flight Information</h2>
          </div>
          
          {tripData.flight ? (
            <div>
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
                      <FaPlane className="text-primary-600" />
                    </div>
                    <div>
                      <div className="font-medium">{tripData.flight.airline}</div>
                      <div className="text-sm text-gray-500">{tripData.flight.flightNumber}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    {tripData.flight.departureDate}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {tripData.flight.stops === 0 ? 'Nonstop' : `${tripData.flight.stops} stop`}
                    {tripData.flight.stops > 0 && tripData.flight.stopAirports && (
                      <span className="block text-xs text-gray-500">
                        via {tripData.flight.stopAirports.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-lg font-semibold">{tripData.flight.departureTime}</div>
                      <div className="text-sm text-gray-500">{tripData.flight.departureAirport}</div>
                    </div>
                    
                    <div className="flex flex-col items-center px-4">
                      <div className="text-xs text-gray-500 mb-1">{tripData.flight.duration}</div>
                      <div className="w-24 h-px bg-gray-300 relative">
                        <div className="absolute -top-1 right-0 w-2 h-2 bg-gray-300 transform rotate-45"></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {tripData.flight.cabinClass}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-semibold">{tripData.flight.arrivalTime}</div>
                      <div className="text-sm text-gray-500">{tripData.flight.arrivalAirport}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-xl font-bold text-primary-700">${tripData.flight.price}</div>
                  <div className="text-sm text-gray-500">per person</div>
                </div>
              </div>
              
              {/* Policy Compliance */}
              {(() => {
                const { compliant, violations } = checkPolicyCompliance('flight', tripData.flight);
                
                if (!compliant) {
                  return (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Policy Violation{violations.length > 1 ? 's' : ''}
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <ul className="list-disc pl-5 space-y-1">
                              {violations.map((violation, index) => (
                                <li key={index}>{violation}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaCheck className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          This flight selection complies with company travel policy.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
              
              <div className="mt-4 flex justify-end">
                <Link to="/flights" className="btn btn-secondary">
                  <FaEdit className="mr-2" />
                  Change Flight
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    No flight selected. 
                    <Link to="/flights" className="font-medium text-yellow-700 underline ml-1">
                      Select a flight
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Hotel Information */}
        <div className="card mb-6">
          <div className="flex items-center mb-4">
            <FaHotel className="text-primary-600 text-xl mr-2" />
            <h2 className="text-xl font-semibold">Hotel Information</h2>
          </div>
          
          {tripData.hotel ? (
            <div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                  <img 
                    src={tripData.hotel.image} 
                    alt={tripData.hotel.name} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
                
                <div className="md:w-3/4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{tripData.hotel.name}</h3>
                      <p className="text-sm text-gray-500">{tripData.hotel.address}</p>
                      
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="text-gray-500">Check-in:</span> {tripData.hotel.checkInDate}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Check-out:</span> {tripData.hotel.checkOutDate}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Duration:</span> {tripData.hotel.nights} nights
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary-700">${tripData.hotel.price}<span className="text-sm font-normal text-gray-500">/night</span></div>
                      <div className="text-sm text-gray-500">${tripData.hotel.totalPrice} total</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Policy Compliance */}
              {(() => {
                const { compliant, violations } = checkPolicyCompliance('hotel', tripData.hotel);
                
                if (!compliant) {
                  return (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Policy Violation{violations.length > 1 ? 's' : ''}
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <ul className="list-disc pl-5 space-y-1">
                              {violations.map((violation, index) => (
                                <li key={index}>{violation}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaCheck className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          This hotel selection complies with company travel policy.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
              
              <div className="mt-4 flex justify-end">
                <Link to="/hotels" className="btn btn-secondary">
                  <FaEdit className="mr-2" />
                  Change Hotel
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    No hotel selected. 
                    <Link to="/hotels" className="font-medium text-yellow-700 underline ml-1">
                      Select a hotel
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Car Rental Information */}
        <div className="card mb-6">
          <div className="flex items-center mb-4">
            <FaCar className="text-primary-600 text-xl mr-2" />
            <h2 className="text-xl font-semibold">Car Rental Information</h2>
          </div>
          
          {tripData.car ? (
            <div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                  <img 
                    src={tripData.car.image} 
                    alt={tripData.car.model} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
                
                <div className="md:w-3/4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-md mr-2">
                          {tripData.car.carType}
                        </span>
                        <h3 className="text-lg font-semibold">{tripData.car.model}</h3>
                      </div>
                      <p className="text-sm text-gray-500">{tripData.car.vendor}</p>
                      
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="text-gray-500">Pickup Location:</span> {tripData.car.pickupLocation}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary-700">${tripData.car.price}<span className="text-sm font-normal text-gray-500">/day</span></div>
                      <div className="text-sm text-gray-500">${tripData.car.totalPrice} total</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Policy Compliance */}
              {(() => {
                const { compliant, violations } = checkPolicyCompliance('car', tripData.car);
                
                if (!compliant) {
                  return (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">
                            Policy Violation{violations.length > 1 ? 's' : ''}
                          </h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <ul className="list-disc pl-5 space-y-1">
                              {violations.map((violation, index) => (
                                <li key={index}>{violation}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaCheck className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          This car rental selection complies with company travel policy.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
              
              <div className="mt-4 flex justify-end">
                <Link to="/cars" className="btn btn-secondary">
                  <FaEdit className="mr-2" />
                  Change Car
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    No car rental selected. 
                    <Link to="/cars" className="font-medium text-yellow-700 underline ml-1">
                      Select a car rental
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Cost Summary */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Cost Summary</h2>
        
        <div className="space-y-2 mb-4">
          {tripData.flight && (
            <div className="flex justify-between">
              <span>Flight</span>
              <span>${tripData.flight.price}</span>
            </div>
          )}
          
          {tripData.hotel && (
            <div className="flex justify-between">
              <span>Hotel ({tripData.hotel.nights} nights)</span>
              <span>${tripData.hotel.totalPrice}</span>
            </div>
          )}
          
          {tripData.car && (
            <div className="flex justify-between">
              <span>Car Rental</span>
              <span>${tripData.car.totalPrice}</span>
            </div>
          )}
          
          <div className="border-t pt-2 font-bold flex justify-between">
            <span>Total</span>
            <span>${calculateTotalCost()}</span>
          </div>
        </div>
        
        {hasPolicyViolations() && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  This trip has policy violations that require manager approval.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      {!bookingConfirmation && (
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div>
            <button 
              onClick={handleDownloadPDF}
              className="btn btn-secondary w-full md:w-auto"
            >
              <FaDownload className="mr-2" />
              Download PDF
            </button>
          </div>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all trip selections?')) {
                  clearTrip();
                  toast.info('Trip cleared successfully');
                }
              }}
              className="btn btn-danger"
            >
              <FaTrash className="mr-2" />
              Clear Trip
            </button>
            
            <button 
              onClick={handleSubmitTrip}
              disabled={!isComplete() || isSubmitting}
              className={`btn btn-primary ${(!isComplete() || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Trip'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripSummary;
