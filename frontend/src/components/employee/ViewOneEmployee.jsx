import React, { useState, useEffect } from "react";
import SoloAlert from "soloalert";
import { useParams } from "react-router";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function ViewOneEmployee() {
  const [isLoading, setLoading] = useState(false);
  const [textState, setTextState] = useState(true);
  const [btngrpState1, setBtnGroupstate1] = useState(true);
  const [btngrpState2, setBtnGroupstate2] = useState(false);
  const [empid, setempid] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [emptype, setemptype] = useState("");
  const [ssn, setssn] = useState("");
  const [mobile, setmobile] = useState("");
  const [bank, setbank] = useState("");
  const [branch, setbranch] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function getDetails() {
      try {
        const result = await axios.get(`https://hotel-management-backend-qaoi.onrender.com/employees/${id}`);
        const data = result.data.data[0];
        setempid(data.empid);
        setfirstname(data.firstname);
        setlastname(data.lastname);
        setemptype(data.emptype);
        setssn(data.ssn);
        setmobile(data.mobile);
        setbank(data.bank);
        setbranch(data.branch);
      } catch (err) {
        console.log(err.message);
      }
    }
    getDetails();
  }, [id]);

  async function updateData(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const newDetails = {
        empid,
        firstname,
        lastname,
        emptype,
        ssn,
        mobile,
        bank,
        branch,
      };
      const result = await axios.put(
        `https://hotel-management-backend-qaoi.onrender.com/employees/${id}`,
        newDetails
      );
      if (result.status === 200) {
        SoloAlert.alert({
          title: "Success!",
          body: "Details updated successfully",
          icon: "success",
          theme: "dark",
          useTransparency: true,
        });
      } else {
        SoloAlert.alert({
          title: "Error!",
          body: "Update failed, please try again later.",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
        });
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  function edit(e) {
    e.preventDefault();
    setTextState(false);
    setBtnGroupstate1(false);
    setBtnGroupstate2(true);
  }

  function cancel(e) {
    e.preventDefault();
    setTextState(true);
    setBtnGroupstate1(true);
    setBtnGroupstate2(false);
  }

  function deleteUser(e) {
    e.preventDefault();
    SoloAlert.confirm({
      title: "Confirm Delete",
      body: "Are you sure you want to delete this employee?",
      theme: "dark",
      useTransparency: true,
      onOk: async function () {
        try {
          const result = await axios.delete(
            `https://hotel-management-backend-qaoi.onrender.com/employees/${id}`
          );
          if (result.status === 200) {
            SoloAlert.alert({
              title: "Deleted!",
              body: "Employee deleted successfully",
              icon: "success",
              theme: "dark",
              useTransparency: true,
              onOk: () => (window.location = "/empManager/view"),
            });
          }
        } catch (err) {
          SoloAlert.alert({
            title: "Error!",
            body: "Failed to delete employee",
            icon: "error",
            theme: "dark",
            useTransparency: true,
          });
        }
      },
      onCancel: () => {
        SoloAlert.alert({
          title: "Cancelled!",
          body: "Delete request canceled",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
        });
      },
    });
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-semibold mb-6">Edit/Delete Employee</h3>
      <form className="space-y-4 bg-white p-6 shadow rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Emp ID</label>
            <input
              type="text"
              value={empid}
              onChange={(e) => setempid(e.target.value)}
              disabled={textState}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              disabled={textState}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              disabled={textState}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Emp Type</label>
            <input
              type="text"
              value={emptype}
              onChange={(e) => setemptype(e.target.value)}
              disabled={textState}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">SSN</label>
            <input
              type="text"
              value={ssn}
              onChange={(e) => setssn(e.target.value)}
              disabled={textState}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Mobile</label>
            <PhoneInput
              value={mobile}
              onChange={setmobile}
              disabled={textState}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Bank</label>
            <input
              type="text"
              value={bank}
              onChange={(e) => setbank(e.target.value)}
              disabled={textState}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Branch</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setbranch(e.target.value)}
              disabled={textState}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {btngrpState1 && (
            <>
              <button
                type="button"
                onClick={edit}
                className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={deleteUser}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </>
          )}
          {btngrpState2 && (
            <>
              <button
                type="button"
                onClick={cancel}
                className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={updateData}
                className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Save"}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
