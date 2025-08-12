import React, { useEffect, useState } from "react";
import axios from "axios";
import SoloAlert from "soloalert";
import { useNavigate, useParams } from "react-router-dom";

const RoomBooking = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [noofguests, setNoofguests] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactno] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [showServicesForm, setShowServicesForm] = useState(false);
  const [services, setServices] = useState({
    roomService: false,
    food: false,
    laundry: false,
  });

  const room = useParams();
  const roomid = room.id;
  const navigate = useNavigate();

  useEffect(() => {
    async function getRoomInfo() {
      try {
        const roomResponse = await axios.get(
          `https://hotel-management-backend-qaoi.onrender.com/room/getroom/${roomid}`
        );
        setRoomType(roomResponse.data.room.roomtype);
        setRoomPrice(roomResponse.data.room.rentperday);
      } catch (error) {
        SoloAlert.alert({
          title: "Error",
          body: "Failed to fetch room details. Please try again later.",
          icon: "error",
        });
      }
    }
    getRoomInfo();
  }, [roomid]);

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setServices((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      fname,
      lname,
      roomtype: roomType,
      noofguests,
      from,
      to,
      email,
      contactno,
      services,
    };

    navigate("/payment", { state: { formData, roomid, roomPrice, services } });
  };

  return (
    <div className="max-w-3xl mx-auto mt-[100px] p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-center uppercase text-gray-700">
        Room Booking
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fname"
              className="block text-md font-medium text-gray-600"
            >
              First Name
            </label>
            <input
              type="text"
              id="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label
              htmlFor="lname"
              className="block text-md font-medium text-gray-600"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        {/* Room Type (Read-only) */}
        <div>
          <label
            htmlFor="roomtype"
            className="block text-md font-medium text-gray-600"
          >
            Room Type
          </label>
          <input
            type="text"
            id="roomtype"
            value={roomType}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
          />
        </div>

        {/* Number of Guests */}
        <div>
          <label
            htmlFor="noofguests"
            className="block text-md font-medium text-gray-600"
          >
            Number of Guests
          </label>
          <input
            type="number"
            id="noofguests"
            value={noofguests}
            onChange={(e) => setNoofguests(Number(e.target.value))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Booking Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="from"
              className="block text-md font-medium text-gray-600"
            >
              From Date
            </label>
            <input
              type="date"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="to"
              className="block text-md font-medium text-gray-600"
            >
              To Date
            </label>
            <input
              type="date"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-md font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label
            htmlFor="contactno"
            className="block text-md font-medium text-gray-600"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contactno"
            value={contactno}
            onChange={(e) => setContactno(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your contact number"
          />
        </div>

        {/* Services Button */}
        <div className="text-center">
          <button
            type="button"
            className="py-2 px-4 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700"
            onClick={() => setShowServicesForm(true)}
          >
            Select Services
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full md:w-1/2 py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
          >
            Book Room
          </button>
        </div>
      </form>

      {/* Services Modal */}
      {showServicesForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6 text-gray-700 text-center">
              Select Additional Services
            </h3>
            <form className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="roomService"
                  name="roomService"
                  checked={services.roomService}
                  onChange={handleServiceChange}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="roomService"
                  className="ml-2 text-md font-medium text-gray-700"
                >
                  Room Service
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="food"
                  name="food"
                  checked={services.food}
                  onChange={handleServiceChange}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="food"
                  className="ml-2 text-md font-medium text-gray-700"
                >
                  Food
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="laundry"
                  name="laundry"
                  checked={services.laundry}
                  onChange={handleServiceChange}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="laundry"
                  className="ml-2 text-md font-medium text-gray-700"
                >
                  laundry
                </label>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="py-2 px-4 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
                  onClick={() => setShowServicesForm(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomBooking;
