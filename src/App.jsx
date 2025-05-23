import { Routes, Route } from "react-router-dom";
import DashboardRoutes from "./routes/DashboardRoutes";
import MainRoutes from "./routes/MainRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeAuth } from "./app/features/authSlice";
import ProtectedRoute from "./components/Protected/Route";
import Error from "./pages/Error/Error";
import { Toaster } from "react-hot-toast";
import { fetchProfile } from "./app/features/profileSlice";
import Page from "./pages/Home/Page";
import Testimonials from "./pages/Home/Testimonials";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated]);

  return children;
};

function App() {
  return (
    <AuthInitializer>
      {/* Global Toaster */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Main Routes (Public) */}
        {/* {MainRoutes} */}
        <Route path="/" element={<Page />} />
        <Route path="/testimonials" element={<Testimonials />} />

        {/* Dashboard Routes (Protected) */}
        {DashboardRoutes}
        {/* 404 Not Found */}
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthInitializer>
  );
}

export default App;
