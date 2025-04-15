import { Route, Outlet, Link } from "react-router-dom";
import Service from "../pages/Dashboard/Service";
import ServicePrice from "../pages/Dashboard/ServicePrice";
import Profile from "../pages/Dashboard/Profile";
import Order from "../pages/Dashboard/Orders";
import Booking from "../pages/Dashboard/Booking";
import Testimonial from "../pages/Dashboard/Testimonials";

function DashboardLayout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard/service">Service</Link>
          <Link to="/dashboard/service-price">Service Price</Link>
          <Link to="/dashboard/profile">Profile</Link>
          <Link to="/dashboard/order">Order</Link>
          <Link to="/dashboard/booking">Booking</Link>
          <Link to="/dashboard/testimonial">Testimonial</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

const DashboardRoutes = (
  <>
    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route path="service" element={<Service />} />
      <Route path="service-price" element={<ServicePrice />} />
      <Route path="profile" element={<Profile />} />
      <Route path="order" element={<Order />} />
      <Route path="booking" element={<Booking />} />
      <Route path="testimonial" element={<Testimonial />} />
    </Route>
  </>
);

export default DashboardRoutes;
