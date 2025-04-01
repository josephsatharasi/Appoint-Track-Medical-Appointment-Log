import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/DashboardNavbar.css";

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/"); // Redirect to landing page
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the state for menu open/close
  };

  return (
    <nav className="dashboard-navbar">
      <h2 className="logo">Meliorem</h2>
      {/* Hamburger Menu Icon */}
      <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Navbar Buttons */}
      <div className={`navbar-buttons ${isMenuOpen ? "open" : ""}`}>
        <button className="nav-btn blue-btn" onClick={() => navigate("/track-appointments")}>
          Track Appointment
        </button>
        <button className="nav-btn blue-btn" onClick={() => navigate("/book-appointment")}>
          Book Appointment
        </button>
        <button className="nav-btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
