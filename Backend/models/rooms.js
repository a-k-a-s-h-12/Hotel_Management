const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomname: {
    type: String,
    required: true,
  },

  noOfguests: {
    type: Number,
    required: true,
  },

  roomtype: {
    type: String,
    required: true,
  },

  facilities: {
    type: String,
    required: true,
  },

  rentperday: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  mainDescription: {
    type: String,
    required: true,
  },
  imageurls: [String],

  currentbookings: [],
});

const room = mongoose.model("room", roomSchema);
module.exports = room;
