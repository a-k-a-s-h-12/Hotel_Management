import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

const RoomCard = ({ room }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <Link to={`/room/${room._id}`}>
          <img
            className="w-full h-48 object-cover"
            src={room.imageurls[0] || "/placeholder.jpg"}
            alt={room.roomname}
          />
        </Link>
        <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
          {room.roomtype}
        </span>
        <button className="absolute top-2 right-2 text-gray-500 bg-white rounded-full p-1 shadow hover:text-red-500">
          <AiOutlineHeart size={20} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {room.roomname}
          </h3>
          <span className="bg-green-500 text-white text-sm font-medium px-2 py-1 rounded">
            Rs.{room.rentperday}/day
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {room.description}
        </p>
        <ul className="text-sm text-gray-700 mt-3 space-y-1">
          <li>
            <strong>No. of Guests:</strong> {room.noOfguests}
          </li>
          <li>
            <strong>Facilities:</strong> {room.facilities}
          </li>
        </ul>
        <div className="flex justify-between items-center mt-4">
          <a className="text-blue-500 font-medium hover:underline">
            View Details
          </a>
          <Link
            className="flex items-center bg-blue-500 text-white text-sm font-medium px-3 py-2 rounded hover:bg-blue-600"
            to={`roomBooking/${room._id}`}
          >
            <AiOutlineShoppingCart size={18} className="mr-2" />
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
