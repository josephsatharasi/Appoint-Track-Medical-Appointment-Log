import React, { useState } from "react";
import { updateAppointment } from "../../api/appointmentApi";
import "../../styles/TrackAppointment.css";

const AppointmentModal = ({ appointment, closeModal }) => {
  const [updatedData, setUpdatedData] = useState({ ...appointment });

  const doctors = [
    "Dr. Alice Johnson - Cardiologist",
    "Dr. Robert Smith - Dermatologist",
    "Dr. Emily Davis - Neurologist",
    "Dr. Michael Brown - Pediatrician",
    "Dr. Sarah Wilson - Orthopedic",
    "Dr. David Clark - ENT Specialist",
  ];

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in again.");
      return;
    }

    await updateAppointment(appointment._id, updatedData, token);
    closeModal();
    window.location.reload();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Appointment</h3>
        <form onSubmit={handleSubmit}>
          <label>Provider:</label>
          <select name="doctor" value={updatedData.doctor} onChange={handleChange} required>
            <option value="">Select a Provider</option>
            {doctors.map((doc, index) => (
              <option key={index} value={doc}>
                {doc}
              </option>
            ))}
          </select>

          <label>Date:</label>
          <input type="date" name="date" value={updatedData.date} onChange={handleChange} required />

          <label>Time:</label>
          <input type="text" name="time" value={updatedData.time} onChange={handleChange} required />

          <label>Reason:</label>
          <textarea name="reason" value={updatedData.reason} onChange={handleChange} required></textarea>

          <label>Status:</label>
          <select name="status" value={updatedData.status} onChange={handleChange} required>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="close-btn" onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
