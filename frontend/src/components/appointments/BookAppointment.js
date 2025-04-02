import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/BookAppointment.css";
import AppointmentConflictModal from './AppointmentConflictModal'; // Import the conflict modal

const BookAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    time: "",
    reason: "",
    status: "Upcoming",
  });
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false); // State for conflict modal

  const doctors = [
    "Dr. Alice Johnson - Cardiologist",
    "Dr. Robert Smith - Dermatologist",
    "Dr. Emily Davis - Neurologist",
    "Dr. Michael Brown - Pediatrician",
    "Dr. Sarah Wilson - Orthopedic",
    "Dr. David Clark - ENT Specialist",
  ];

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minutes of [0, 30]) {
        let period = hour < 12 ? "AM" : "PM";
        let displayHour = hour > 12 ? hour - 12 : hour;
        slots.push(`${displayHour}:${minutes === 0 ? "00" : "30"} ${period}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedForm = { ...prevState, [name]: value };
      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (Object.values(formData).some((value) => value.trim() === "")) {
      toast.error("All fields are required!");
      return;
    }

    // Validate the appointment date (not in the past)
    const selectedDate = new Date(formData.date);
    const today = new Date();

    if (selectedDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
      toast.warning("You cannot book an appointment in the past!");
      return;
    }

    // Check if appointment already exists (Call the backend API to check for conflicts)
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to book an appointment.");
        return;
      }

      const response = await fetch("https://backend-ip1x.onrender.com/api/appointments/check-conflict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Pass the token here
        },
        body: JSON.stringify({
          doctor: formData.doctor,
          date: formData.date,
          time: formData.time,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // No conflict, proceed with booking
        const bookResponse = await fetch("https://backend-ip1x.onrender.com/api/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Pass token for booking as well
          },
          body: JSON.stringify(formData),
        });

        const bookData = await bookResponse.json();

        if (bookResponse.ok) {
          toast.success("Appointment booked successfully!");
          navigate("/booking-success");
        } else {
          toast.error(bookData.message || "Failed to book appointment");
        }
      } else {
        // Show modal if there's a conflict
        setIsConflictModalOpen(true);
      }
    } catch (error) {
      console.error("Error checking appointment conflict:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleModalClose = () => {
    setIsConflictModalOpen(false); // Close the modal
  };

  return (
    <div className="appointment-container">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <select name="doctor" required value={formData.doctor} onChange={handleChange}>
          <option value="">Select a Provider</option>
          {doctors.map((doc, index) => (
            <option key={index} value={doc}>
              {doc}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
        />

        <select name="time" required value={formData.time} onChange={handleChange}>
          <option value="">Select Time</option>
          {timeSlots.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>

        <textarea
          name="reason"
          placeholder="Reason for visit"
          required
          value={formData.reason}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="submit-btn">
          Book Appointment
        </button>
      </form>

      {/* Appointment Conflict Modal */}
      {isConflictModalOpen && <AppointmentConflictModal onClose={handleModalClose} />}
    </div>
  );
};

export default BookAppointment;
