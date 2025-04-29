import { Route } from "react-router-dom";
import Service from "../pages/Dashboard/Service";
import ServicePrice from "../pages/Dashboard/ServicePrice";
import Profile from "../pages/Dashboard/Profile";
import Order from "../pages/Dashboard/Orders";
import Booking from "../pages/Dashboard/Booking";
import Testimonial from "../pages/Dashboard/Testimonials";
import Layout from "../pages/Dashboard/Layout";
import Transactions from "../pages/Dashboard/Transactions";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Unauthorized from "../pages/Error/Unauthorized";
import ProtectedRoute from "../components/Protected/Route";

const DashboardRoutes = (
  <>
    <Route path="/dashboard" element={<Layout />}>
      {/* Route yang bisa diakses semua role */}
      <Route index element={<DashboardHome />} />
      <Route path="profile" element={<Profile />} />
      <Route path="booking" element={<Booking />} />
      <Route path="transactions" element={<Transactions />} />

      {/* Bungkus semua route admin dalam satu ProtectedRoute */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="service" element={<Service />} />
        <Route path="service-price" element={<ServicePrice />} />
        <Route path="order" element={<Order />} />
        <Route path="testimonial" element={<Testimonial />} />
      </Route>
    </Route>

    {/* Route untuk unauthorized */}
    <Route path="/unauthorized" element={<Unauthorized />} />
  </>
);

export default DashboardRoutes;
