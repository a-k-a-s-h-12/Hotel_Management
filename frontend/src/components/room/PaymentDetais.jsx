import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewAllPayments() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [allPayments, setAllPayments] = useState([]);

  useEffect(() => {
    async function getPayments() {
      try {
        const result = await (
          await axios.get("http://localhost:5000/payment")
        ).data;
        setAllPayments(result);
        setFiltered(result);
        console.log(result);
      } catch (err) {
        console.log(err.message);
      }
    }

    getPayments();
  }, []);
  useEffect(() => {
    setFiltered(
      allPayments.filter((payment) => {
        return (
          payment.name.toLowerCase().includes(search.toLowerCase()) ||
          payment.roomType.toLowerCase().includes(search.toLowerCase()) ||
          payment.isPaid.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, allPayments]);

  return (
    <div className="p-8 bg-gray-100 w-[1500px] ml-[300px] mt-[50px]">
      <nav className="bg-white shadow p-4 mb-6 rounded-md flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Room Payment Details</h3>
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
              <th className="py-3 px-6 text-left">Guest Name</th>
              <th className="py-3 px-6 text-left">Room Type</th>
              <th className="py-3 px-6 text-left">Guests</th>
              <th className="py-3 px-6 text-left">Start Date</th>
              <th className="py-3 px-6 text-left">End Date</th>
              <th className="py-3 px-6 text-left">Number of Days</th>
              <th className="py-3 px-6 text-left">Room Price/Day</th>
              <th className="py-3 px-6 text-left">Total Cost</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered
              .slice(0)
              .reverse()
              .map((payment, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-600"
                >
                  <td className="py-3 px-6 text-left">{payment.name}</td>
                  <td className="py-3 px-6 text-left">{payment.roomType}</td>
                  <td className="py-3 px-6 text-left">{payment.guests}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(payment.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(payment.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {payment.numberOfDays}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {payment.roomPricePerDay}
                  </td>
                  <td className="py-3 px-6 text-left">{payment.totalCost}</td>
                  <td className="py-3 px-6 text-left">{payment.isPaid}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
