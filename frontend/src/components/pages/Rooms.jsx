import React, { useEffect, useState } from "react";
import RoomCard from "../layouts/RoomCard";
import axios from "axios";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function getRooms() {
      try {
        const response = await axios.get(
          "http://localhost:5000/room/getallrooms"
        );
        // Filter rooms to include only those where currentBookings is null
        const availableRooms = response.data.filter(
          (room) => !room.currentbookings || room.currentbookings.length === 0
        );
        setRooms(availableRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }
    getRooms();
  }, []);

  return (
    <div className="min-h-screen p-6 pl-[60px]">
      <h1 className="text-3xl font-bold text-black text-center mb-8 pb-5 pt-5">
        AVAILABLE ROOMS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {rooms.length > 0 ? (
          rooms.map((room, index) => <RoomCard key={index} room={room} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No available rooms at the moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default Rooms;
