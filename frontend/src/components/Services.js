import React from "react";
import "../styles/Services.css";

const Services = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <div className="service-list">
        <div className="service-item">
          <h2>Appointment Scheduling</h2>
          <p>Easily book and manage your medical appointments online.</p>
        </div>
        <div className="service-item">
          <h2>Appointment Tracking</h2>
          <p>View upcoming and past appointments with detailed information.</p>
        </div>
        <div className="service-item">
          <h2>Appointment Filtering</h2>
          <p>Sort and filter your appointments by date, status, or provider.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
