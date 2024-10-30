import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      console.log("Login successful:", response.data);
    } catch (err) {
      setError(
        "Login failed. Please check your email or password and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const googelAuth = async (data) => {
    setError("");
    try {
      console.log(data);
      const { email, name: fullname, sub: password } = data;

      const userData = {
        fullname,
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:5000/google-auth",
        userData
      );

      console.log("Login successful:", response);

      // navigate('/home')
    } catch (err) {
      setError(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full mx-4 sm:mx-0 border border-gray-200 animate-slideUp">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to QuickTrial
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
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
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="ml-[159px] p-2">--Or--</p>
        <GoogleOAuthProvider clientId={`${clientId}`}>
          <div className="ml-20">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                googelAuth(decoded);
                console.log(decoded);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </GoogleOAuthProvider>
        <p className="text-center text-gray-600 mt-8">
          Don't have an account?{" "}
          <Link to={"/signup"}>
            {" "}
            <a className="text-blue-600 hover:underline">Sign Up</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
