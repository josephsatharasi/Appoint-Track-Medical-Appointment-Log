
import React from 'react';
import "../../styles/AppointmentCard.css"; // Make sure to create the CSS for the card

const AppointmentCard = ({ appointment, onClose, onDelete, onEdit }) => {
  return (
    <div className="appointment-card-overlay">
      <div className="appointment-card">
        <div className="appointment-card-header">
          <h3>Appointment Details</h3>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div className="appointment-card-body">
          <p><strong>Doctor:</strong> {appointment.doctor}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Reason:</strong> {appointment.reason}</p>
          <p><strong>Status:</strong> {appointment.status}</p>
        </div>
        <div className="appointment-card-actions">
          <button onClick={() => onEdit(appointment)}>Edit</button>
          <button onClick={() => onDelete(appointment._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
