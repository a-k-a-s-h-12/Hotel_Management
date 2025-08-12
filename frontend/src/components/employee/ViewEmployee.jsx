import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ViewAllEmp() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [allEmp, setAllEmp] = useState([]);
  const [empStats, setEmpStats] = useState({
    total: 0,
    chef: 0,
    roomService: 0,
    receptionist: 0,
  });

  useEffect(() => {
    async function getDetails() {
      try {
        const result = await axios.get("http://localhost:5000/employees/");
        setAllEmp(result.data.data);
        setFiltered(result.data.data);

        // Calculate total and specific counts
        const stats = {
          total: result.data.data.length,
          chef: result.data.data.filter(
            (emp) => emp.emptype.toLowerCase() === "chef"
          ).length,
          roomService: result.data.data.filter(
            (emp) => emp.emptype.toLowerCase() === "room-service"
          ).length,
          receptionist: result.data.data.filter(
            (emp) => emp.emptype.toLowerCase() === "receptionist"
          ).length,
        };

        setEmpStats(stats);
      } catch (err) {
        console.log(err.message);
      }
    }

    getDetails();
  }, []);

  useEffect(() => {
    setFiltered(
      allEmp.filter((item) => {
        return (
          item.empid.toLowerCase().includes(search.toLowerCase()) ||
          item.firstname.toLowerCase().includes(search.toLowerCase()) ||
          item.lastname.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, allEmp]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Employee Management Header */}
      <nav className="bg-white shadow p-4 mb-6 rounded-md flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Employee Management</h3>
        <input
          type="search"
          placeholder="Search"
          className="input-field w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </nav>

      {/* Employee Statistics */}
      <div className="bg-white shadow p-4 mb-6 rounded-md">
        <h4 className="text-xl font-medium mb-4">Employee Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-md shadow-md">
            <strong>Total Employees:</strong> {empStats.total}
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-md">
            <strong>Chefs:</strong> {empStats.chef}
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md shadow-md">
            <strong>Room Service:</strong> {empStats.roomService}
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md shadow-md">
            <strong>Receptionists:</strong> {empStats.receptionist}
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">Emp ID</th>
              <th className="py-3 px-6 text-left">First Name</th>
              <th className="py-3 px-6 text-left">Last Name</th>
              <th className="py-3 px-6 text-left">Emp Type</th>
              <th className="py-3 px-6 text-left">SSN</th>
              <th className="py-3 px-6 text-left">Mobile</th>
              <th className="py-3 px-6 text-left">Bank</th>
              <th className="py-3 px-6 text-left">Branch</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {filtered
              .slice(0)
              .reverse()
              .map((emp) => (
                <tr key={emp._id} className="border-b border-gray-700">
                  <td className="py-3 px-6">{emp.empid}</td>
                  <td className="py-3 px-6">{emp.firstname}</td>
                  <td className="py-3 px-6">{emp.lastname}</td>
                  <td className="py-3 px-6">{emp.emptype}</td>
                  <td className="py-3 px-6">{emp.ssn}</td>
                  <td className="py-3 px-6">{emp.mobile}</td>
                  <td className="py-3 px-6">{emp.bank}</td>
                  <td className="py-3 px-6">{emp.branch}</td>
                  <td className="py-3 px-6">
                    <Link
                      to={`/empManager/view/${emp._id}`}
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
