const express = require("express");
const router = express.Router();
const Rooms = require("./../models/rooms");

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Rooms.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getroom/:id", async (req, res) => {
  try {
    let roomId = req.params.id;
    const room = await Rooms.findById(roomId);
    res.send({ room });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addnewroom", async (req, res) => {
  try {
    const newroom = new Rooms(req.body);
    await newroom.save();
    res
      .status(200)
      .send({ Message: "New room successfully added to the system" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.route("/editroom/:id").put(async (req, res) => {
  const roomID = req.params.id;
  const {
    roomname,
    noOfguests,
    roomtype,
    facilities,
    rentperday,
    description,
    imageurls,
  } = req.body;

  const updateRoom = {
    roomname,
    noOfguests,
    roomtype,
    facilities,
    rentperday,
    description,
    imageurls,
  };

  try {
    const room = await Rooms.findById(roomID);
    if (!room) {
      return res.status(404).send({ status: "Room not found" });
    }

    await Rooms.findByIdAndUpdate(roomID, updateRoom);
    res.status(200).send({ status: "Room details are updated" });
  } catch (e) {
    console.error(e);
    res.status(500).send({ status: "Error in updating Room details" });
  }
});

router.route("/deleteroom/:id").delete(async (req, res) => {
  let roomID = req.params.id;

  await Rooms.findByIdAndDelete(roomID)
    .then(() => {
      res.status(200).send({ status: "Room deleted from system" });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({ status: "Error in deleting room details" });
    });
});

router.patch("/editroom/:id", async (req, res) => {
  const roomID = req.params.id;
  const { customer } = req.body; // Expecting customer details in the request body

  try {
    const room = await Rooms.findById(roomID);
    if (!room) {
      return res.status(404).send({ status: "Room not found" });
    }
    room.currentbookings.push(customer);
    await room.save();

    res
      .status(200)
      .send({ status: "Current booking updated successfully", room });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error updating current booking", error });
  }
});

// New route to clear bookings
router.patch("/clearbookings/:id", async (req, res) => {
  const roomId = req.params.id; // Get the room ID from the URL parameters

  try {
    // Find the room by its ID and set currentbookings to null
    const updatedRoom = await Rooms.findByIdAndUpdate(
      roomId,
      { currentbookings: [] }, // Set currentbookings to null
      { new: true } // Return the updated room document
    );

    // If room not found, send a 404 response
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Send a success response with the updated room data
    res
      .status(200)
      .json({ message: "Room bookings cleared", room: updatedRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
