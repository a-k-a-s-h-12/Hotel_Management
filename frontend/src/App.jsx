import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/layouts/Home";
import CusRegister from "./components/auth/CusRegister";
import CusLogin from "./components/auth/CusLogin";
import "./App.css";
import Dashboard from "./Dashboard";
import Empsidenav from "./components/layouts/Empsidenav";
import AddEmployee from "./components/employee/AddEmployee";
import ViewAllEmp from "./components/employee/ViewEmployee";
import ViewOneEmployee from "./components/employee/ViewOneEmployee";
import ViewAllPaidSalaries from "./components/employee/ViewPaidSalary";
import AddPaidSalary from "./components/employee/AddPaidSalary";
import Roomsidenav from "./components/layouts/Roomsidenav";
import ViewAllRooms from "./components/room/ViewAllRooms";
import AddRoom from "./components/room/AddRooms";
import ViewOneRoom from "./components/room/ViewOneRoom";
import ViewAllRoomBookings from "./components/room/ViewAllRoomBookings";
import NavBar from "./Navbar";
import Rooms from "./components/pages/Rooms";
import Services from "./components/pages/Services";
import SpecificRoom from "./components/pages/SpecificRoom";
import RoomBooking from "./components/Bookings/RoomBooking";
import Payment from "./components/Payment";
import BookingConfirmation from "./components/BookingConfirmation";
import ContactPage from "./components/Contact";
import ViewAllPayments from "./components/room/PaymentDetais"; 

function EmpManagerLayout() {
  return (
    <div className="flex">
      <Empsidenav />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

function RoomLayout() {
  return (
    <div className="flex">
      <Roomsidenav />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

function MainLayout() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<CusLogin />} />
        <Route path="/register" element={<CusRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/empManager" element={<EmpManagerLayout />}>
          <Route path="add" element={<AddEmployee />} />
          <Route path="view" element={<ViewAllEmp />} />
          <Route path="view/:id" element={<ViewOneEmployee />} />
        </Route>

       
        <Route path="/paidsalManager" element={<EmpManagerLayout />}>
          <Route path="view" element={<ViewAllPaidSalaries />} />
          <Route path="add" element={<AddPaidSalary />} />
        </Route>

        
        <Route path="/roommanager" element={<RoomLayout />}>
          <Route path="view" element={<ViewAllRooms />} />
          <Route path="add" element={<AddRoom />} />
          <Route path="view/:id" element={<ViewOneRoom />} />
        </Route>

        <Route path="/viewbookings" element={<ViewAllRoomBookings />} />

        
        <Route path="/paymentDetails" element={<ViewAllPayments />} />

       
        <Route path="/main" element={<MainLayout />}>
          <Route path="rooms" element={<Rooms />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="rooms/roomBooking/:id" element={<RoomBooking />} />
        </Route>

        <Route path="room" element={<MainLayout />}>
          <Route path=":id" element={<SpecificRoom />} />
        </Route>

        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
