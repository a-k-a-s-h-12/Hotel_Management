import React, { useState } from "react";
import SoloAlert from "soloalert";
import axios from "axios";

export default function AddRoom() {
  const [roomname, setRoomname] = useState("");
  const [noOfguests, setNoOfguests] = useState("");
  const [roomtype, setRoomtype] = useState("");
  const [facilities, setFacilities] = useState("");
  const [rentperday, setRentperday] = useState("");
  const [description, setDescription] = useState("");
  const [mainDescription, setmainDescription] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");

  async function submitData(e) {
    e.preventDefault();
    if (
      !roomname ||
      !noOfguests ||
      !roomtype ||
      !facilities ||
      !rentperday ||
      !description ||
      !mainDescription ||
      !url1 ||
      !url2 ||
      !url3
    ) {
      SoloAlert.alert({
        title: "Oops!",
        body: "Please fill all fields",
        icon: "warning",
        theme: "dark",
        useTransparency: true,
      });
    } else {
      const newDetails = {
        roomname,
        noOfguests,
        roomtype,
        facilities,
        rentperday,
        description,
        mainDescription,
        url1,
        url2,
        url3,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/room/addnewroom",
          newDetails
        );
        if (response.status === 200) {
          SoloAlert.alert({
            title: "Success!",
            body: "New room added successfully",
            icon: "success",
            theme: "dark",
            useTransparency: true,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  function clearForm(e) {
    e.preventDefault();
    setRoomname("");
    setNoOfguests("");
    setRoomtype("");
    setFacilities("");
    setRentperday("");
    setDescription("");
    setUrl1("");
    setUrl2("");
    setUrl3("");
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Add Room</h3>
      <hr className="mb-4" />

      <form onSubmit={submitData} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={roomname}
              onChange={(e) => setRoomname(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              No of Guests
            </label>
            <input
              type="number"
              value={noOfguests}
              onChange={(e) => setNoOfguests(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={roomtype}
              onChange={(e) => setRoomtype(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              required
            >
              <option disabled value="">
                Choose...
              </option>
              <option>Single</option>
              <option>Standard</option>
              <option>Executive</option>
              <option>Family</option>
              <option>Villa</option>
              <option>Suite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Facilities
            </label>
            <input
              type="text"
              value={facilities}
              onChange={(e) => setFacilities(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rent per Day (Rs.)
            </label>
            <input
              type="number"
              value={rentperday}
              onChange={(e) => setRentperday(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Main Description
            </label>
            <textarea
              value={mainDescription}
              onChange={(e) => setmainDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Url 1
            </label>
            <input
              type="text"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Url 2
            </label>
            <input
              type="text"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Url 3
            </label>
            <input
              type="text"
              value={url3}
              onChange={(e) => setUrl3(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={clearForm}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            <i className="fa fa-ban"></i> Clear form
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            <i className="fa fa-file-export"></i> Submit form
          </button>
        </div>
      </form>
    </div>
  );
}
