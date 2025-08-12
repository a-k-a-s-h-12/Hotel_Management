import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SoloAlert from "soloalert";
import axios from "axios";

import jsPDF from "jspdf";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state?.formData || {};
  const roomid = location.state?.roomid || "";
  const roomPrice = location.state?.roomPrice || 0;
  const services = location.state?.services || {};

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [noOfDays, setNoOfDays] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (formData.from && formData.to) {
      const fromDate = new Date(formData.from);
      const toDate = new Date(formData.to);
      const diffTime = Math.abs(toDate - fromDate);
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNoOfDays(days);
      setTotalCost(days * roomPrice);
    }
  }, [formData.from, formData.to, roomPrice]);

  const generateReceiptPDF = (paymentData, bookingData) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Payment Receipt", 105, 20, null, null, "center");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Cardholder Name: ${paymentData.cardName}`, 20, 40);
    doc.text(
      `Card Number: **** **** **** ${paymentData.cardNumber.slice(-4)}`,
      20,
      50
    );
    doc.text(`Expiry Date: ${paymentData.expiry}`, 20, 60);
    doc.text(`Booking Details:`, 20, 80);
    doc.text(`Name: ${bookingData.fname} ${bookingData.lname}`, 20, 90);
    doc.text(`Room Type: ${bookingData.roomtype}`, 20, 100);
    doc.text(`Guests: ${bookingData.noofguests}`, 20, 110);
    doc.text(`Dates: ${bookingData.from} to ${bookingData.to}`, 20, 120);
    doc.text(`Number of Days: ${noOfDays}`, 20, 130);
    doc.text(`Room Price (per day): Rs.${roomPrice.toFixed(2)}`, 20, 140);
    doc.text(`Total Cost: Rs.${totalCost.toFixed(2)}`, 20, 150);
    doc.text("Thank you for your payment!", 20, 170);
    doc.save("payment_receipt.pdf");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (cardNumber.length !== 16 || cvv.length !== 3) {
      SoloAlert.alert({
        title: "Invalid Input",
        body: "Please check your card details and try again.",
        icon: "warning",
      });
      return;
    }

    const paymentData = {
      cardName,
      cardNumber,
      expiry,
      cvv,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      SoloAlert.alert({
        title: "Success",
        body: "Payment processed successfully!",
        icon: "success",
      });

      const bookingData = {
        fname: formData.fname,
        lname: formData.lname,
        roomtype: formData.roomtype,
        noofguests: formData.noofguests,
        from: formData.from,
        to: formData.to,
        email: formData.email,
        contactno: formData.contactno,
      };

      await axios.post("https://hotel-management-backend-qaoi.onrender.com/booking", bookingData);

      const roomUpdateData = {
        customer: {
          fname: formData.fname,
          lname: formData.lname,
          email: formData.email,
          roomtype: formData.roomtype,
          contactno: formData.contactno,
          from: formData.from,
          to: formData.to,
          services: services,
        },
      };

      await axios.patch(
        `https://hotel-management-backend-qaoi.onrender.com/room/editroom/${roomid}`,
        roomUpdateData
      );

      const paymentPostData = {
        name: `${formData.fname} ${formData.lname}`,
        roomType: formData.roomtype,
        guests: formData.noofguests,
        startDate: formData.from,
        endDate: formData.to,
        numberOfDays: noOfDays,
        roomPricePerDay: roomPrice,
        totalCost: totalCost,
        isPaid: "Paid",
      };

      await axios.post("https://hotel-management-backend-qaoi.onrender.com/payment", paymentPostData);

      generateReceiptPDF(paymentData, bookingData);

      navigate("/booking-confirmation");
    } catch (error) {
      console.error("Error processing payment or booking:", error);
      SoloAlert.alert({
        title: "Error",
        body: "There was an issue processing your payment or booking. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-xl w-full p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center uppercase">
          Payment
        </h2>
        <div className="mb-4 text-center">
          <p>
            <strong>Room Price (per day):</strong> Rs.{roomPrice.toFixed(2)}
          </p>
          <p>
            <strong>Number of Days:</strong> {noOfDays}
          </p>
          <p>
            <strong>Total Cost:</strong> Rs.{totalCost.toFixed(2)}
          </p>
        </div>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label
              htmlFor="cardName"
              className="block text-sm font-medium text-gray-300"
            >
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-300"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={16}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="expiry"
              className="block text-sm font-medium text-gray-300"
            >
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              id="expiry"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-300"
            >
              CVV
            </label>
            <input
              type="password"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength={3}
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
