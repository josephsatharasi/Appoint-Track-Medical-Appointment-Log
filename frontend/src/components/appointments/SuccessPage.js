import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/SuccessPage.css"; // Make sure to create this CSS file

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-content">
        <div className="checkmark">&#10004;</div> {/* Green checkmark */}
        <h2>Appointment Confirmed!</h2>
        <p>Your appointment has been successfully booked. We look forward to seeing you!</p>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    </div>
  );
};

export default SuccessPage;
