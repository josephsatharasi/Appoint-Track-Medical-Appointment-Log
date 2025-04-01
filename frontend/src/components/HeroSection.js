import React from "react";
import { useNavigate } from "react-router-dom";
import doctorImage from "./../assets/docter.jpg";
import "./../styles/styles.css";

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleAppointmentClick = () => {
    navigate("/login"); // Navigate to Login Page
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="expert-tag">🩺 EXPERT HEALTH APPROACH</p>
        <h1>We follow a holistic approach to health care.</h1>
        <p className="description">
          At Meliorem, we provide top-notch medical services with a patient-centric approach. Our team of expert doctors and healthcare professionals ensures the best care tailored to your needs.
        </p>
        <p className="description">
          We focus on a comprehensive health strategy, integrating modern technology, expert diagnosis, and personalized treatment plans to help you lead a healthier life.
        </p>
        <div className="hero-buttons">
          <button className="primary-btn" onClick={handleAppointmentClick}>
            Make Appointment
          </button>
        </div>
      </div>
      <div className="hero-image">
        <img src={doctorImage} alt="Doctor" />
        {/* <div className="floating-box call-center">📞 24/7 Call Center</div> */}
        <div className="floating-box meet-doctors">👨‍⚕️ Meet Our Doctors</div>
      </div>
    </section>
  );
};

export default HeroSection;
