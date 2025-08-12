import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ViewAllPaidSalaries() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [allPaidSalaries, setAllPaidSalaries] = useState();

  useEffect(() => {
    async function getDetails() {
      try {
        const result = await axios.get("https://hotel-management-backend-qaoi.onrender.com/paidsalaries");
        setAllPaidSalaries(result.data.data);
        // console.log(result.data.data);

        setFiltered(result.data.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getDetails();
  }, []);

  // console.log(allPaidSalaries);

  // useEffect(() => {
  //   setFiltered(
  //     allPaidSalaries.filter(
  //       (item) =>
  //         item.paymentid.toLowerCase().includes(search.toLowerCase()) ||
  //         item.emplid.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );
  // }, [search, allPaidSalaries]);

  return (
    <div className="p-4">
      <nav className="bg-white shadow-md mb-4">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">
            Paid Salary Management
          </h3>
          <div className="flex">
            <input
              type="search"
              placeholder="Search by Payment ID or Employee ID"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
            />
          </div>
        </div>
      </nav>

      <div className="overflow-auto bg-gray-800 shadow-md rounded-lg">
        <table className="min-w-full text-white">
          <thead>
            <tr className="bg-gray-800 text-white font-bold ">
              <th className="p-3 text-left font-semibold">Emp ID</th>
              <th className="p-3 text-left font-semibold">Account No</th>
              <th className="p-3 text-left font-semibold">Basic Salary</th>
              <th className="p-3 text-left font-semibold">Total Salary</th>
              <th className="p-3 text-left font-semibold">Paid Date</th>
              <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered
                .slice(0)
                .reverse()
                .map((paidsal) => (
                  <tr key={paidsal._id} className="border-b border-gray-20">
                    <td className="p-3">{paidsal.emplid}</td>
                    <td className="p-3">{paidsal.accountnumber}</td>
                    <td className="p-3">{paidsal.basicsalary}</td>
                    <td className="p-3">{paidsal.totalsalary}</td>
                    <td className="p-3">{paidsal.paiddate}</td>
                    <td className="p-3 text-center">
                      <Link
                        to={`/paidsalManager/view/${paidsal._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <i className="far fa-edit" title="Edit"></i> Edit
                      </Link>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
