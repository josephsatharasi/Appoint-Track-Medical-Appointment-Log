import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import DashboardFooter from "./components/Dashboard/DashboardFooter";
import DashboardNavbar from "./components/Dashboard/DashboardNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import BookAppointment from "./components/appointments/BookAppointment";
import SuccessPage from "./components/appointments/SuccessPage";
import FailurePage from "./components/appointments/FailurePage";
import TrackAppointment from "./components/appointments/TrackAppointment";
import AppointmentConflictPage from "./components/appointments/AppointmentConflictPage";  // Import the conflict page
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };
    }
  }, [location]);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<><Navbar /><HeroSection /><Footer /></>} />

        {/* Auth Pages */}
        <Route path="/login" element={localStorage.getItem("token") ? <Navigate to="/dashboard" replace /> : <><Navbar /><Login /><Footer /></>} />
        <Route path="/signup" element={localStorage.getItem("token") ? <Navigate to="/dashboard" replace /> : <><Navbar /><Signup /><Footer /></>} />
        <Route path="/forgot-password" element={<><Navbar /><ForgotPassword /><Footer /></>} />
        <Route path="/reset-password/:token" element={<><Navbar /><ResetPassword /><Footer /></>} />

        {/* Dashboard (Protected) */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardNavbar /><Dashboard /><DashboardFooter /></ProtectedRoute>} />

        {/* Booking Appointment */}
        <Route path="/book-appointment" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />

        {/* Track Appointments */}
        <Route path="/track-appointments" element={<ProtectedRoute><TrackAppointment /></ProtectedRoute>} />

        {/* Success Page */}
        <Route path="/booking-success" element={<SuccessPage />} />

        {/* Failure Page */}
        <Route path="/booking-failed" element={<FailurePage />} />

        {/* Conflict Page */}
        <Route path="/appointment-conflict" element={<AppointmentConflictPage />} />
      </Routes>
    </>
  );
};

export default App;
