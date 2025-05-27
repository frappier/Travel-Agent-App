import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaPlane, FaHotel, FaCar, FaClipboardList, FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for mobile */}
      <div 
        className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={closeSidebar}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
      </div>
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:static md:h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-primary-600">Travel Booking</span>
          </div>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={closeSidebar}
          >
            <FaTimes />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg mb-2 ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={closeSidebar}
          >
            <FaClipboardList className="mr-3" />
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/flights" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg mb-2 ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={closeSidebar}
          >
            <FaPlane className="mr-3" />
            Flights
          </NavLink>
          
          <NavLink 
            to="/hotels" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg mb-2 ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={closeSidebar}
          >
            <FaHotel className="mr-3" />
            Hotels
          </NavLink>
          
          <NavLink 
            to="/cars" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg mb-2 ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={closeSidebar}
          >
            <FaCar className="mr-3" />
            Car Rentals
          </NavLink>
          
          <NavLink 
            to="/summary" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg mb-2 ${
                isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={closeSidebar}
          >
            <FaClipboardList className="mr-3" />
            Trip Summary
          </NavLink>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <FaUser className="text-primary-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Travel Agent</p>
              <p className="text-xs text-gray-500">agent@example.com</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm h-16 flex items-center">
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
            <button 
              className="text-gray-500 hover:text-gray-700 md:hidden"
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
            
            <div className="flex items-center ml-auto">
              <div className="relative">
                <span className="text-sm text-gray-700">Welcome, Travel Agent</span>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
