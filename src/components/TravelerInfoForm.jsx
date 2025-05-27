import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBriefcase, FaIdCard } from 'react-icons/fa';
import { useTripContext } from '../contexts/TripContext';
import { toast } from 'react-toastify';

const TravelerInfoForm = () => {
  const { tripData, updateTravelerInfo } = useTripContext();
  const [formData, setFormData] = useState({
    name: tripData.traveler.name || '',
    email: tripData.traveler.email || '',
    phone: tripData.traveler.phone || '',
    department: tripData.traveler.department || '',
    employeeId: tripData.traveler.employeeId || ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    updateTravelerInfo(formData);
    toast.success('Traveler information updated successfully');
  };
  
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaUser className="text-primary-600 mr-2" />
        Traveler Information
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="form-label">
              <FaUser className="inline mr-1" /> Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="form-label">
              <FaEnvelope className="inline mr-1" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="john.doe@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="form-label">
              <FaPhone className="inline mr-1" /> Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="(123) 456-7890"
            />
          </div>
          
          <div>
            <label htmlFor="department" className="form-label">
              <FaBriefcase className="inline mr-1" /> Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-input"
              placeholder="Engineering"
            />
          </div>
          
          <div>
            <label htmlFor="employeeId" className="form-label">
              <FaIdCard className="inline mr-1" /> Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="form-input"
              placeholder="EMP12345"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Save Traveler Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelerInfoForm;
