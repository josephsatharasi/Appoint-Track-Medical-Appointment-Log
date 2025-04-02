import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";  // ✅ Corrected Import
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.css";

// Import Loading Component
import Loading from "./components/Loading";  

// Lazy Load Components for better performance
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));
const HeroSection = lazy(() => import("./components/HeroSection"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const DashboardNavbar = lazy(() => import("./components/Dashboard/DashboardNavbar"));
const DashboardFooter = lazy(() => import("./components/Dashboard/DashboardFooter"));
const BookAppointment = lazy(() => import("./components/appointments/BookAppointment"));
const SuccessPage = lazy(() => import("./components/appointments/SuccessPage"));
const FailurePage = lazy(() => import("./components/appointments/FailurePage"));
const TrackAppointment = lazy(() => import("./components/appointments/TrackAppointment"));
const AppointmentConflictPage = lazy(() => import("./components/appointments/AppointmentConflictPage"));
const About = lazy(() => import("./components/About"));
const Services = lazy(() => import("./components/Services"));
const Contact = lazy(() => import("./components/Contact"));

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      window.history.pushState(null, "", window.location.href);
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
      };
    }
  }, [location]);

  if (loading) {
    return <Loading />; // Show loading screen when the app first loads
  }

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<><Navbar /><HeroSection /><Footer /></>} />

          {/* About, Services, and Contact Pages */}
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />

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
      </Suspense>
    </>
  );
};

export default App;
