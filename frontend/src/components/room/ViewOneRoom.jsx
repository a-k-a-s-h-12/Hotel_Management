import React, { useState, useEffect } from "react";
import SoloAlert from "soloalert";
import { useParams } from "react-router";
import axios from "axios";

export default function ViewOneRoom() {
  const [textState, setTextState] = useState(true);
  const [btngrpState1, setBtnGroupstate1] = useState(true);
  const [btngrpState2, setBtnGroupstate2] = useState(false);

  const [roomname, setRoomname] = useState("");
  const [noOfguests, setnoOfguests] = useState("");
  const [roomtype, setRoomtype] = useState("");
  const [facilities, setFacilities] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [description, setDescription] = useState("");
  const [mainDescription, setmainDescription] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");

  const { id } = useParams();
  useEffect(() => {
    async function getDetails() {
      try {
        const result = await axios.get(
          `http://localhost:5000/room/getroom/${id}`
        );
        const room = result.data.room;

        setRoomname(room.roomname);
        setnoOfguests(room.noOfguests);
        setRoomtype(room.roomtype);
        setFacilities(room.facilities);
        setrentperday(room.rentperday);
        setDescription(room.description);
        setmainDescription(room.mainDescription);
        setUrl1(room.imageurls[0]);
        setUrl2(room.imageurls[1]);
        setUrl3(room.imageurls[2]);
      } catch (err) {
        console.log(err.message);
      }
    }
    getDetails();
  }, [id]);

  async function updateData(e) {
    e.preventDefault();
    try {
      const imageurls = [url1, url2, url3];
      const newDetails = {
        roomname,
        noOfguests,
        roomtype,
        facilities,
        rentperday,
        description,
        imageurls,
      };
      console.log(newDetails);

      const response = await axios.put(
        `http://localhost:5000/room/editroom/${id}`,
        newDetails
      );
      if (response.status === 200) {
        SoloAlert.alert({
          title: "Success!",
          body: "Details updated successfully",
          icon: "success",
          theme: "dark",
        });
      }
    } catch (err) {
      SoloAlert.alert({
        title: "Error",
        body: "An error occurred. Please try again later.",
        icon: "error",
        theme: "dark",
      });
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

  async function deleteRoom(e) {
    e.preventDefault();
    SoloAlert.confirm({
      title: "Confirm Delete",
      body: "Are you sure?",
      theme: "dark",
      onOk: async function () {
        try {
          const response = await axios.delete(
            `http://localhost:5000/room/deleteroom/${id}`
          );
          if (response.status === 200) {
            SoloAlert.alert({
              title: "Success!",
              body: "Room deleted successfully.",
              icon: "success",
              theme: "dark",
            });
            window.location = "/roommanager/view";
          }
        } catch (err) {
          SoloAlert.alert({
            title: "Error",
            body: "An error occurred during deletion.",
            icon: "error",
            theme: "dark",
          });
        }
      },
      onCancel: function () {
        SoloAlert.alert({
          title: "Cancelled",
          body: "Delete request cancelled.",
          icon: "warning",
          theme: "dark",
        });
      },
    });
  }

  // Function to clear currentbookings array
  async function clearBookings(e) {
    e.preventDefault();
    SoloAlert.confirm({
      title: "Clear Bookings",
      body: "Are you sure you want to clear the current bookings for this room?",
      theme: "dark",
      onOk: async function () {
        try {
          // Send a request to clear the bookings array (not setting it to null)
          const response = await axios.patch(
            `http://localhost:5000/room/clearbookings/${id}`,
            {
              currentbookings: [], // Set the currentbookings to an empty array
            }
          );
          if (response.status === 200) {
            SoloAlert.alert({
              title: "Success!",
              body: "Room bookings cleared successfully.",
              icon: "success",
              theme: "dark",
            });
          }
        } catch (err) {
          SoloAlert.alert({
            title: "Error",
            body: "An error occurred while clearing the bookings.",
            icon: "error",
            theme: "dark",
          });
        }
      },
      onCancel: function () {
        SoloAlert.alert({
          title: "Cancelled",
          body: "Clear bookings request cancelled.",
          icon: "warning",
          theme: "dark",
        });
      },
    });
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-semibold mb-6">Edit/Delete Room</h3>
      <form className="space-y-4 bg-white p-6 shadow rounded-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={roomname}
              onChange={(e) => setRoomname(e.target.value)}
              disabled={textState}
            />
          </div>
          <div>
            <label className="block text-gray-700">No of Guests</label>
            <input
              type="number"
              className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={noOfguests}
              onChange={(e) => setnoOfguests(e.target.value)}
              disabled={textState}
            />
          </div>
          <div>
            <label className="block text-gray-700">Type</label>
            <select
              className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={roomtype}
              onChange={(e) => setRoomtype(e.target.value)}
              disabled={textState}
            >
              <option>Single</option>
              <option>Standard</option>
              <option>Executive</option>
              <option>Family</option>
              <option>Villa</option>
              <option>Suite</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Facilities</label>
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
              disabled={textState}
            />
          </div>
          <div>
            <label className="block text-gray-700">Rent per Day</label>
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={rentperday}
              onChange={(e) => setrentperday(e.target.value)}
              disabled={textState}
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={textState}
            />
          </div>
          <div>
            <label className="block text-gray-700">Main Description</label>
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={mainDescription}
              onChange={(e) => setmainDescription(e.target.value)}
              disabled={textState}
            />
          </div>
          <div>
            <label className="block text-gray-700">Url 1</label>
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              disabled={textState}
            />
          </div>
          <div>
            <label className="block text-gray-700">Url 2</label>
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              disabled={textState}
            />
          </div>
          <div>
            <label className="block text-gray-700">Url 3</label>
            <input
              type="text"
              className="input-field w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={url3}
              onChange={(e) => setUrl3(e.target.value)}
              disabled={textState}
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <div className="flex space-x-2">
            <button
              onClick={edit}
              className="bg-indigo-500 text-white py-2 px-4 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={cancel}
              className="bg-gray-500 text-white py-2 px-4 rounded-md"
              style={{ display: btngrpState2 ? "block" : "none" }}
            >
              Cancel
            </button>
            <button
              onClick={updateData}
              className="bg-green-500 text-white py-2 px-4 rounded-md"
              style={{ display: btngrpState2 ? "block" : "none" }}
            >
              Update
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={deleteRoom}
              className="bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Delete
            </button>
            <button
              onClick={clearBookings}
              className="bg-yellow-500 text-white py-2 px-4 rounded-md"
            >
              Clear Bookings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
