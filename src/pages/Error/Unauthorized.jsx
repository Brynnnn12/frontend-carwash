// src/pages/Error/Unauthorized.js
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        403 - Unauthorized
      </h1>
      <p className="text-lg mb-6">
        You don't have permission to access this page.
      </p>
      <Link
        to="/dashboard"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;
