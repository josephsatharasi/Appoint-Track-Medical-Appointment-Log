import React from "react";
import { Link } from "react-router-dom";  // Use only if React Router is enabled
import "./../styles/styles.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">Meliorem</div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="footer-text">© 2025 Meliorem Healthcare. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
