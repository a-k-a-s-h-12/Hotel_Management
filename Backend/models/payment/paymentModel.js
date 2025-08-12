const mongoose = require("mongoose");

// Define the simplified Payment Schema
const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  numberOfDays: {
    type: Number,
    required: true,
  },
  roomPricePerDay: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: String,
    enum: ["Paid", "Unpaid"],
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
