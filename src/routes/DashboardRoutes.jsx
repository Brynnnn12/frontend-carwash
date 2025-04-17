import { Route, Outlet, Link } from "react-router-dom";
import Service from "../pages/Dashboard/Service";
import ServicePrice from "../pages/Dashboard/ServicePrice";
import Profile from "../pages/Dashboard/Profile";
import Order from "../pages/Dashboard/Orders";
import Booking from "../pages/Dashboard/Booking";
import Testimonial from "../pages/Dashboard/Testimonials";
import Layout from "../pages/Dashboard/Layout";
import Transactions from "../pages/Dashboard/Transactions";

const DashboardRoutes = (
  <>
    <Route path="/dashboard" element={<Layout />}>
      <Route path="service" element={<Service />} />
      <Route path="service-price" element={<ServicePrice />} />
      <Route path="profile" element={<Profile />} />
      <Route path="order" element={<Order />} />
      <Route path="booking" element={<Booking />} />
      <Route path="testimonial" element={<Testimonial />} />
      <Route path="transactions" element={<Transactions />} />
    </Route>
  </>
);

export default DashboardRoutes;
