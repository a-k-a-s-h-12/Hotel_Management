import React from "react";
import { Link } from "react-router-dom";
import { FaHouseUser, FaPlusSquare } from "react-icons/fa";

export default function Roomsidenav() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <nav className="bg-white shadow-lg p-4 w-64 space-y-6">
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Room Manager
        </h2>

        <div className="space-y-2">
          <Link
            to="/roommanager/view"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 transition"
            title="View Rooms"
          >
            <FaHouseUser size={20} className="text-blue-500" />
            <span className="text-gray-700 font-medium">View Rooms</span>
          </Link>

          <Link
            to="/roommanager/add"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-100 transition"
            title="Add Room"
          >
            <FaPlusSquare size={20} className="text-green-500" />
            <span className="text-gray-700 font-medium">Add Room</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
