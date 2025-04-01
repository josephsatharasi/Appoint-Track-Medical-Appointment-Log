import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "../../styles/Home.css"; 

import doctor1 from "../../assets/images/doctor1.png";
import doctor2 from "../../assets/images/doctor2.png";
import doctor3 from "../../assets/images/doctor3.png";

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="doctors-images">
          <img src={doctor1} alt="Expert Doctor" />
          <img src={doctor2} alt="Specialist Doctor" />
          <img src={doctor3} alt="Healthcare Professional" /> 
        </div>
        <h1>Advanced Healthcare Solutions for Your Well-being</h1>
        <p>
          We provide seamless medical consultations, expert diagnosis, and personalized treatment plans.
          Our goal is to enhance patient care with cutting-edge technology and professional medical expertise.
        </p>
        
        {/* Button navigates to BookAppointment page */}
        <button className="btn" onClick={() => navigate("/book-appointment")}>
          Lets go
        </button>
      </div>

      <div className="services">
        <div className="service-card"> 
          <h3>Expert Medical Consultation</h3>
          <p>Receive professional healthcare advice from experienced specialists for accurate diagnosis and treatment.</p>
        </div>
        <div className="service-card"> 
          <h3>Personalized Treatment Plans</h3>
          <p>Get customized treatment options tailored to your medical needs, ensuring effective and timely care.</p>
        </div>
        <div className="service-card"> 
          <h3>Seamless Appointment Scheduling</h3>
          <p>Easily book, manage, and track your medical appointments with our user-friendly platform.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;