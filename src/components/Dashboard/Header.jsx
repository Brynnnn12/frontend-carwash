import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const profile = useSelector((state) => state.profile.data);

  const username = profile?.user?.username || "Guest";
  const avatar = profile?.avatar;

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

        {/* Welcome Text */}
        <div className="ml-4">
          <div className="text-sm sm:text-base font-semibold text-primary">
            <span className="badge badge-primary badge-outline px-4 py-2 shadow-sm">
              Selamat datang, {username}
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center ml-auto">
          <div className="ml-3 relative">
            <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
              {avatar ? (
                <img
                  className="h-8 w-8 rounded-full"
                  src={avatar}
                  alt="Avatar"
                />
              ) : (
                <FaUserCircle className="h-8 w-8 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
