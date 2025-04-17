import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-500 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu className="h-6 w-6" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xs ml-4 lg:ml-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <FaBell className="h-6 w-6" />
          </button>

          <div className="ml-3 relative">
            <div className="flex items-center space-x-2">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FaUserCircle className="h-8 w-8 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
