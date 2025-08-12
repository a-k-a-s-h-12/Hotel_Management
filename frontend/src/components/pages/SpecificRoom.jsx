import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"; // Import arrow icons

const SpecificRoom = () => {
  const [roomname, setRoomname] = useState("");
  const [noOfguests, setNoOfGuests] = useState("");
  const [roomtype, setRoomtype] = useState("");
  const [facilities, setFacilities] = useState("");
  const [rentperday, setRentPerDay] = useState("");
  const [description, setDescription] = useState("");
  const [mainDescription, setMainDescription] = useState("");
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    async function getDetails() {
      try {
        const response = await axios.get(
          `http://localhost:5000/room/getroom/${id}`
        );
        const room = response.data.room;

        setRoomname(room.roomname);
        setNoOfGuests(room.noOfguests);
        setRoomtype(room.roomtype);
        setFacilities(room.facilities);
        setRentPerDay(room.rentperday);
        setDescription(room.description);
        setMainDescription(room.mainDescription);

        setImages((room.imageurls || []).filter((img) => img));
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    }
    getDetails();
  }, [id]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="mx-auto px-4 py-6 w-[45%] pt-[75px]">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">{roomname}</h1>
        <p className="text-gray-600 italic text-lg">{description}</p>
      </div>

      <div className="mb-8">
        {/* Image Display */}
        {images.length > 0 ? (
          <div className="relative w-full h-[500px] mb-6">
            <img
              src={images[currentIndex]}
              alt={`Room Image ${currentIndex + 1}`}
              className="w-full h-full object-ss rounded-lg "
            />
            {/* Left Arrow Button */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 flex items-center justify-center"
            >
              <AiOutlineLeft size={24} />
            </button>
            {/* Right Arrow Button */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 flex items-center justify-center"
            >
              <AiOutlineRight size={24} />
            </button>
          </div>
        ) : (
          <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center rounded-lg mb-6">
            <span className="text-gray-500">No Images Available</span>
          </div>
        )}
      </div>

      <div className="mb-8">
        {/* Room Details */}
        <h2 className="text-2xl mb-4 font-bold">Room Details</h2>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Room Type:</strong> {roomtype}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Number of Guests:</strong> {noOfguests}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Facilities:</strong> {facilities}
        </p>
        <p className="text-lg text-gray-600 mb-6">
          <strong>Rent per Day:</strong> Rs. {rentperday}
        </p>
      </div>

      <div className="mb-8">
        {/* Room Description */}
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-gray-700 text-lg text-justify leading-relaxed">
          {mainDescription}
        </p>
      </div>

      {/* Book Room Button */}
      <div>
        <Link
          to={`/main/rooms/roomBooking/${id}`}
          className="inline-flex items-center bg-blue-500 text-white text-lg font-medium px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Book Room
        </Link>
      </div>
    </div>
  );
};

export default SpecificRoom;
