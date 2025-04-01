import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/FailurePage.css"; // Make sure to create this CSS file

const FailurePage = () => {
  const navigate = useNavigate();

  return (
    <div className="failure-container">
      <div className="failure-content">
        <div className="crossmark">&#10006;</div> {/* Red Cross Mark */}
        <h2>Booking Failed!</h2>
        <p>Sorry, your appointment could not be booked. Please try again later.</p>
        <button onClick={() => navigate("/book-appointment")}>Try Again</button>
      </div>
    </div>
  );
};

export default FailurePage;
