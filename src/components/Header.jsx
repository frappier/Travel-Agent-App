import { useState } from 'react';
import { FaBell, FaQuestion, FaUserCircle } from 'react-icons/fa';
import { useTripContext } from '../contexts/TripContext';

const Header = () => {
  const { tripData } = useTripContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-800">
            {tripData.traveler.name ? `Trip for ${tripData.traveler.name}` : 'New Trip'}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <FaQuestion />
          </button>
          
          <button className="text-gray-500 hover:text-gray-700 relative">
            <FaBell />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </button>
          
          <div className="relative">
            <button 
              className="flex items-center space-x-2"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <FaUserCircle className="text-gray-500 text-2xl" />
              <span className="text-sm font-medium text-gray-700">Travel Agent</span>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Your Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
