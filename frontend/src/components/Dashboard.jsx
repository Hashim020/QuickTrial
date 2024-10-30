// src/components/Dashboard.jsx
import React from "react";
import { Link,useNavigate } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100  p-6 animate-fadeIn">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full mx-4 sm:mx-0 border border-gray-200 transform transition-transform duration-300 ease-in-out hover:scale-105 animate-slideUp">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome to QuickTrial
        </h1>

        <p className="text-center text-gray-700 mb-8">
          {`If you already have an account, click "Login" below. If you're new here, select "Sign Up" to create an account.`}
        </p>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Link to={"/login"}>
            <button className="w-full sm:w-auto bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Login
            </button>
          </Link>

          <Link to={"/signup"}>
            <button className="w-full sm:w-auto bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50">
              Sign Up
            </button>
          </Link>
        </div>

        <p className="text-center text-gray-600 mt-8">
          Need assistance?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
