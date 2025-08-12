import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewAllRoomBookings() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [allBookings, setAllBookings] = useState([]);

  // This useEffect function is used to get all bookings data
  useEffect(() => {
    async function getDetails() {
      try {
        const result = await (
          await axios.get("http://localhost:5000/booking/")
        ).data.data;
        setAllBookings(result);
        setFiltered(result); // Set initial filtered data to show all bookings
        console.log(result);
      } catch (err) {
        console.log(err.message);
      }
    }

    getDetails();
  }, []);

  // This useEffect method is used to perform a search function
  useEffect(() => {
    setFiltered(
      allBookings.filter((items) => {
        return (
          items.fname.toLowerCase().includes(search.toLowerCase()) ||
          items.lname.toLowerCase().includes(search.toLowerCase()) ||
          items.roomtype.toLowerCase().includes(search.toLowerCase()) ||
          items.email.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, allBookings]);

  return (
    <div className="p-8 bg-gray-100 w-[1500px] ml-[300px] mt-[50px]">
      <nav className="bg-white shadow p-4 mb-6 rounded-md flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Room Bookings</h3>
        <input
          type="search"
          placeholder="Search"
          className="input-field w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </nav>

      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Room Type</th>
              <th className="py-3 px-6 text-left">No of Guests</th>
              <th className="py-3 px-6 text-left">From</th>
              <th className="py-3 px-6 text-left">To</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Contact</th>
            </tr>
          </thead>
          <tbody>
            {filtered
              .slice(0)
              .reverse()
              .map((booking, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-600"
                >
                  <td className="py-3 px-6 text-left">{booking.fname}</td>
                  <td className="py-3 px-6 text-left">{booking.lname}</td>
                  <td className="py-3 px-6 text-left">{booking.roomtype}</td>
                  <td className="py-3 px-6 text-left">{booking.noofguests}</td>
                  <td className="py-3 px-6 text-left">{booking.from}</td>
                  <td className="py-3 px-6 text-left">{booking.to}</td>
                  <td className="py-3 px-6 text-left">{booking.email}</td>
                  <td className="py-3 px-6 text-left">{booking.contactno}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
