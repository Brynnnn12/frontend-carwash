import {
  FaCar,
  FaHistory,
  FaMoneyBillWave,
  FaCog,
  FaSignOutAlt,
  FaCogs,
  FaStar,
} from "react-icons/fa";
import { MdDashboard, MdPriceChange } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-blue-800 text-white z-30 transform transition-transform duration-300
    ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0 lg:static lg:inset-auto`}
      >
        <div className="flex items-center justify-center h-16 px-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">
            <span className="text-white">Shine</span>
            <span className="text-yellow-300">Wash</span>
          </h1>
        </div>

        <nav className="mt-6">
          <div className="px-4">
            <p className="text-blue-200 uppercase text-xs font-semibold px-3 py-2">
              Main
            </p>
            <Link
              to="/dashboard"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-4 py-3 text-white bg-blue-900 rounded-lg"
            >
              <MdDashboard className="w-5 h-5" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </div>

          <div className="mt-4 px-4">
            <p className="text-blue-200 uppercase text-xs font-semibold px-3 py-2">
              Services
            </p>
            <Link
              to="/dashboard/booking"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              <FaCar className="w-5 h-5" />
              <span className="ml-3">Booking</span>
            </Link>
            <Link
              to="/dashboard/transactions"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors mt-2"
            >
              <FaHistory className="w-5 h-5" />
              <span className="ml-3">Transactions</span>
            </Link>
            <Link
              to="/dashboard/service-price"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors mt-2"
            >
              <MdPriceChange className="w-5 h-5" />
              <span className="ml-3">Service Price</span>
            </Link>
            <Link
              to="/dashboard/service"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors mt-2"
            >
              <FaCogs className="w-5 h-5" />
              <span className="ml-3">Service</span>
            </Link>
            <Link
              to="/dashboard/testimonial"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors mt-2"
            >
              <FaStar className="w-5 h-5" />
              <span className="ml-3">Testimonial</span>
            </Link>
          </div>

          <div className="mt-8 px-4">
            <p className="text-blue-200 uppercase text-xs font-semibold px-3 py-2">
              Settings
            </p>
            <Link
              to="/logout"
              className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors mt-2"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
