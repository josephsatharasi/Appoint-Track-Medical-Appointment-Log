import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import "../../styles/AppointmentConflict.css";

const AppointmentConflictPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const conflictDetails = location.state?.conflictDetails || {};

  const handleClose = () => {
    navigate("/book-appointment"); // Redirect to book appointment page
  };

  return (
    <div className="conflict-container">
      <h2>Appointment Conflict</h2>
      <p>
        The selected time slot for <strong>{conflictDetails?.doctor}</strong> on <strong>{conflictDetails?.date}</strong> at <strong>{conflictDetails?.time}</strong> is already booked.
      </p>
      <p>Please choose a different time or doctor.</p>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default AppointmentConflictPage;
