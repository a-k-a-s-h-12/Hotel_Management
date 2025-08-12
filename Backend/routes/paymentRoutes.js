const express = require("express");
const router = express.Router();
const Payment = require("../models/payment/paymentModel");

// POST Route to create a new payment
router.post("/", async (req, res) => {
  try {
    const {
      name,
      roomType,
      guests,
      startDate,
      endDate,
      numberOfDays,
      roomPricePerDay,
      totalCost,
      isPaid,
    } = req.body;

    // Create a new payment document
    const payment = new Payment({
      name,
      roomType,
      guests,
      startDate,
      endDate,
      numberOfDays,
      roomPricePerDay,
      totalCost,
      isPaid,
    });

    // Save to the database
    await payment.save();
    res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating payment", error: error.message });
  }
});

// GET Route to get all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching payments", error: error.message });
  }
});

module.exports = router;
