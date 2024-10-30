// src/components/SignupPage.jsx
import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"


const SignupPage = () => {
  // State for form inputs
  const [formData, setFormData] = useState({ fullname: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Email regex pattern
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    setSuccess(""); // Clear previous success messages

    // Validation
    if (!formData.fullname.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    // Reset error and set loading state
    setLoading(true);

    try {
      // Sample API call for signup (replace with actual API endpoint)
      const response = await axios.post("http://localhost:5000/signup", formData);
      console.log("Signup successful:", response.data);

      // Set success message
      setSuccess("Account created successfully. Please login.");
      setFormData({ fullname: "", email: "", password: "" }); 
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full mx-4 sm:mx-0 border border-gray-200 animate-slideUp">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign Up for QuickTrial
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        
        <p className="text-center text-gray-600 mt-8">
          Already have an account? <Link to={"/login"}><a  className="text-blue-600 hover:underline">Login</a></Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;