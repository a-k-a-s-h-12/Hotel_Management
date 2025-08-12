const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const customerRoutes = require("./routes/customer/customerRoute");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local development
      "https://hotel-management-frontend-57nf.onrender.com" // deployed
    ],
    credentials: true,
  })
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server start on port : ${PORT}`);
});

const URL = process.env.MONGO_CONNECT;
mongoose
  .connect(URL)
  .then(() => console.log("DB connection successful!"))
  .catch((error) => console.error("DB connection error:", error));

app.use("/customer", customerRoutes);

const employeeRouter = require("././routes/emp-manager/employeesRoute.js");
app.use("/employees", employeeRouter);

const paidsalariesRouter = require("./routes/emp-manager/paidSalaries.js");
app.use("/paidsalaries", paidsalariesRouter);

const roomRouter = require("./routes/rooms.js");
app.use("/room", roomRouter);

const bookingRoutes = require("../Backend/routes/room-booking/bookingroutes.js");
app.use("/booking", bookingRoutes);

const paymentRoutes = require("../Backend/routes/paymentRoutes.js");
app.use("/payment", paymentRoutes);
