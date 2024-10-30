import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FreeTrialPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!user || !token) {
      navigate('/');
      return;
    }

    if (user && user.subscriptionEnd) {
      const subscriptionEnd = new Date(user.subscriptionEnd);

      const updateCountdown = () => {
        const now = new Date();
        const timeRemaining = subscriptionEnd - now;

        if (timeRemaining <= 0) {

          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate('/'); 
        } else {
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

          setTimeLeft({ days, hours, minutes, seconds });
        }
      };

      // Run updateCountdown every second
      const interval = setInterval(updateCountdown, 1000);

      // Clean up the interval when component unmounts
      return () => clearInterval(interval);
    }
  }, [user, token, navigate]);

  const handleUpgrade = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/start-trial",
        { trialType: "7-Day Trial" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {

        localStorage.setItem("user", JSON.stringify(response.data.user));

        const newSubscriptionEnd = new Date(response.data.user.subscriptionEnd);
        setTimeLeft({
          days: Math.floor((newSubscriptionEnd - new Date()) / (1000 * 60 * 60 * 24)),
          hours: Math.floor((newSubscriptionEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((newSubscriptionEnd % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((newSubscriptionEnd % (1000 * 60)) / 1000),
        });
      }
    } catch (error) {
      console.error("Error upgrading subscription:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Free Trial Countdown</h1>
        <div className="flex space-x-4 text-gray-800">
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold">{timeLeft.days}</span>
            <span className="text-lg uppercase">Days</span>
          </div>
          <span className="text-6xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold">{timeLeft.hours}</span>
            <span className="text-lg uppercase">Hours</span>
          </div>
          <span className="text-6xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold">{timeLeft.minutes}</span>
            <span className="text-lg uppercase">Minutes</span>
          </div>
          <span className="text-6xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold">{timeLeft.seconds}</span>
            <span className="text-lg uppercase">Seconds</span>
          </div>
        </div>
        {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
          <p className="mt-6 text-red-500 font-bold text-xl">Your subscription period has ended!</p>
        )}
        <button
          onClick={handleUpgrade}
          className="absolute top-4 right-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Upgrade to 7 Days
        </button>
      </div>
    </div>
  );
};

export default FreeTrialPage;
