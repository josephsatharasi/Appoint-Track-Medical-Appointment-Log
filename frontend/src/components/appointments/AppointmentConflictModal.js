import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentConflictModal = ({ onClose, conflictDetails }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    // Close the modal
    if (onClose) onClose();

    // Navigate to the booking page
    navigate('/book-appointment');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Appointment Conflict</h2>
        <p>
          The selected time slot for <strong>{conflictDetails?.doctor}</strong> on <strong>{conflictDetails?.date}</strong> at <strong>{conflictDetails?.time}</strong> is already booked.
        </p>
        <p>Please choose a different time or doctor.</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default AppointmentConflictModal;
