'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { 
  FaBox, 
  FaClipboardList, 
  FaUsers, 
  FaUser, 
  FaTachometerAlt, 
  FaSignOutAlt,
  FaChevronLeft,
  FaBars
} from 'react-icons/fa';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: <FaTachometerAlt className="w-5 h-5" />, 
      path: '/admin/dashboard' 
    },
    { 
      title: 'Add Product', 
      icon: <FaBox className="w-5 h-5" />, 
      path: '/admin/add-product' 
    },
    { 
      title: 'Manage Product', 
      icon: <FaBox className="w-5 h-5" />, 
      path: '/admin/manage-product' 
    },
    { 
      title: 'Manage Orders', 
      icon: <FaClipboardList className="w-5 h-5" />, 
      path: '/admin/manage-order' 
    },
    { 
      title: 'Manage Users', 
      icon: <FaUsers className="w-5 h-5" />, 
      path: '/admin/manage-user' 
    },
  ];
  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <div 
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } min-h-screen bg-slate-700 text-white transition-all duration-300 fixed left-0 top-0`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-gray-900 p-1.5 rounded-full text-white"
      >
        {isCollapsed ? 
          <FaBars className="w-4 h-4" /> : 
          <FaChevronLeft className="w-4 h-4" />
        }
      </button>

      {/* Header/Logo */}
      <div className="p-4 text-center border-b border-gray-700">
        {isCollapsed ? (
          <span className="text-2xl font-bold">S</span>
        ) : (
          <span className="text-2xl font-bold">ShopNest</span>
        )}
      </div>

      {/* Admin Info */}
      <div className={`p-4 border-b border-gray-700 ${
        isCollapsed ? 'text-center' : ''
      }`}>
        <div className="w-12 h-12 rounded-full bg-gray-800 mx-auto mb-2 flex items-center justify-center">
          <FaUser className="w-6 h-6" />
        </div>
        {!isCollapsed && (
          <>
            <h3 className="font-medium">Admin User</h3>
            <p className="text-sm text-gray-400">admin@shopnest.com</p>
          </>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center py-2 px-4 rounded-lg transition-colors ${
                  pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-start'
          } w-full py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors`}
        >
          <FaSignOutAlt className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;