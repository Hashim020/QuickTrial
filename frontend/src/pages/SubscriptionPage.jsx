import React from 'react';
import axios from 'axios';
import {  useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const navigate = useNavigate();
    const handleClik = async (e, trialType) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.post(
        "http://localhost:5000/start-trial",
        { trialType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(`${trialType} started successfully:`, response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user))
      if(response.data.success){
        navigate("/Trial");
      }
    } catch (error) {
      console.error(`Error starting ${trialType}:`, error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full">
        
        {/* 1-Minute Trial Card */}
        <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center sm:items-start border border-gray-200">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">1-Minute Trial</h3>
          <p className="text-gray-500 mb-4">Free</p>
          <p className="mb-4 text-center sm:text-left text-gray-700">
            Experience our service for a minute, free of charge. See what we offer.
          </p>
          <button
            onClick={(e) => handleClik(e, "1-Minute Trial")}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
          >
            Start 1-Minute Trial
          </button>
        </div>

        {/* 7-Day Trial Card */}
        <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center sm:items-start border border-gray-200">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">7-Day Trial</h3>
          <p className="text-gray-500 mb-4">free</p>
          <p className="mb-4 text-center sm:text-left text-gray-700">
            Get full access for 7 days. Experience all premium features.
          </p>
          <button
            onClick={(e) => handleClik(e, "7-Day Trial")}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
          >
            Start 7-Day Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
