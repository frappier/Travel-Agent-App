import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaPlane, 
  FaHotel, 
  FaCar, 
  FaClipboardList, 
  FaCog,
  FaUserTie // Using FaUserTie instead of FaConcierge
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-100';
  };
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <FaHome /> },
    { path: '/flights', label: 'Flights', icon: <FaPlane /> },
    { path: '/hotels', label: 'Hotels', icon: <FaHotel /> },
    { path: '/cars', label: 'Car Rentals', icon: <FaCar /> },
    { path: '/summary', label: 'Trip Summary', icon: <FaClipboardList /> },
    { path: '/policy', label: 'Policy Settings', icon: <FaCog /> },
  ];

  return (
    <div className="bg-white w-64 border-r border-gray-200 h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <FaUserTie className="text-primary-600 text-2xl mr-2" />
          <h1 className="text-xl font-bold text-gray-900">Travel Assistant</h1>
        </div>
      </div>
      
      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-1 px-2">
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive(item.path)}`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
