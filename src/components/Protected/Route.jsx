// src/components/ProtectedRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, status } = useSelector((state) => state.auth);
  const location = useLocation();

  if (status === "loading") {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
