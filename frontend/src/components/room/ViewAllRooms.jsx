import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ViewAllRooms() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [roomStats, setRoomStats] = useState({
    total: 0,
    single: 0,
    standard: 0,
    executive: 0,
    family: 0,
    villa: 0,
    suite: 0,
    fulfilled: 0,
    available: 0,
  });

  useEffect(() => {
    async function getDetails() {
      try {
        const result = await axios.get(
          "http://localhost:5000/room/getallrooms"
        );
        setAllRooms(result.data);
        setFiltered(result.data);

        const stats = {
          total: result.data.length,
          single: result.data.filter(
            (room) => room.roomtype.toLowerCase() === "single"
          ).length,
          standard: result.data.filter(
            (room) => room.roomtype.toLowerCase() === "standard"
          ).length,
          executive: result.data.filter(
            (room) => room.roomtype.toLowerCase() === "executive"
          ).length,
          family: result.data.filter(
            (room) => room.roomtype.toLowerCase() === "family"
          ).length,
          villa: result.data.filter(
            (room) => room.roomtype.toLowerCase() === "villa"
          ).length,
          suite: result.data.filter(
            (room) => room.roomtype.toLowerCase() === "suite"
          ).length,
          fulfilled: result.data.filter(
            (room) => room.currentbookings && room.currentbookings.length > 0
          ).length,
          available: result.data.filter(
            (room) => !room.currentbookings || room.currentbookings.length === 0
          ).length,
        };

        setRoomStats(stats);
      } catch (err) {
        console.log(err.message);
      }
    }
    getDetails();
  }, []);

  useEffect(() => {
    setFiltered(
      allRooms.filter((item) => {
        return (
          item.roomname.toLowerCase().includes(search.toLowerCase()) ||
          item.noOfguests.toString().includes(search.toLowerCase()) ||
          item.roomtype.toLowerCase().includes(search.toLowerCase()) ||
          item.facilities.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, allRooms]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <nav className="bg-white shadow p-4 mb-6 rounded-md flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Room Management</h3>
        <input
          type="search"
          placeholder="Search"
          className="input-field w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </nav>

      {/* Room Statistics */}
      <div className="bg-white shadow p-4 mb-6 rounded-md">
        <h4 className="text-xl font-medium mb-4">Room Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-md shadow-md">
            <strong>Total Rooms:</strong> {roomStats.total}
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-md">
            <strong>Available Rooms:</strong> {roomStats.available}
          </div>
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md shadow-md">
            <strong>Fulfilled Rooms:</strong> {roomStats.fulfilled}
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-md">
            <strong>Single:</strong> {roomStats.single}
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md shadow-md">
            <strong>Standard:</strong> {roomStats.standard}
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md shadow-md">
            <strong>Executive:</strong> {roomStats.executive}
          </div>
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-md shadow-md">
            <strong>Family:</strong> {roomStats.family}
          </div>
          <div className="bg-pink-100 text-pink-800 px-4 py-2 rounded-md shadow-md">
            <strong>Villa:</strong> {roomStats.villa}
          </div>
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md shadow-md">
            <strong>Suite:</strong> {roomStats.suite}
          </div>
        </div>
      </div>

      {/* Room Table */}
      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">No of Guests</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Facilities</th>
              <th className="py-3 px-6 text-left">Rent Per Day (Rs)</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered
              .slice(0)
              .reverse()
              .map((room) => (
                <tr key={room._id} className="border-b border-gray-700">
                  <td className="py-3 px-6">
                    {room.imageurls && room.imageurls.length > 0 ? (
                      <img
                        src={room.imageurls[0]}
                        alt={room.roomname}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="py-3 px-6">
                    {room.roomname}
                    {room.currentbookings &&
                      room.currentbookings.length > 0 && (
                        <span className="text-red-500 ml-2 font-semibold">
                          (Full)
                        </span>
                      )}
                  </td>
                  <td className="py-3 px-6">{room.noOfguests}</td>
                  <td className="py-3 px-6">{room.roomtype}</td>
                  <td className="py-3 px-6">{room.facilities}</td>
                  <td className="py-3 px-6">{room.rentperday}</td>
                  <td className="py-3 px-6">{room.description}</td>
                  <td className="py-3 px-6">
                    <Link
                      to={`/roomManager/view/${room._id}`}
                      className="text-indigo-500 hover:underline"
                    >
                      <i className="far fa-edit"></i> Edit
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
