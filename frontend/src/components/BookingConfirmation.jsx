import React from "react";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/main/rooms");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Thank You!</h2>
        <p className="text-lg mb-6">
          Your booking and payment were successful.
        </p>
        <button
          onClick={handleGoBack}
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Go Back to Rooms
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
