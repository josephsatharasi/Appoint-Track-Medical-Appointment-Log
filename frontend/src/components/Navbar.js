import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import "../styles/Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    closeMenu();
  };

  const handleSignup = () => {
    navigate("/signup");
    closeMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Hamburger Button on Right */}
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
      </div>

      {/* Logo at Center */}
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Meliorem Healthcare" className="logo" />
        </Link>
      </div>

      {/* Navigation Links for Large Screens */}
      <div className="nav-links-desktop">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Right-Side Login & Signup (For Large Screens) */}
        <div className="nav-buttons">
          <button className="login-btn" onClick={handleLogin}>Login</button>
          <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="close-button" onClick={closeMenu}>
          <FaTimes />
        </div>
        <div className="nav-links">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/services" onClick={closeMenu}>Services</Link>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
        </div>
        <div className="nav-buttons">
          <button className="login-btn" onClick={handleLogin}>Login</button>
          <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
