import { Routes, Route } from "react-router-dom";
import DashboardRoutes from "./routes/DashboardRoutes";
import MainRoutes from "./routes/MainRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeAuth } from "./app/features/authSlice";
import ProtectedRoute from "./components/Protected/Route";
import Error from "./pages/Error/Error";
import { Toaster } from "react-hot-toast";
import { fetchProfile } from "./app/features/profileSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(fetchProfile());
  }, [dispatch]);

  return children;
};

function App() {
  return (
    <AuthInitializer>
      {/* Global Toaster */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Main Routes (Public) */}
        {MainRoutes}

        {/* Dashboard Routes (Protected) */}
        <Route element={<ProtectedRoute />}>{DashboardRoutes}</Route>

        {/* 404 Not Found */}
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthInitializer>
  );
}

export default App;
