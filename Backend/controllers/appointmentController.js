const Appointment = require("../models/Appointment");

// Check if there is a conflict for the appointment
exports.checkAppointmentConflict = async (req, res) => {
  try {
    const { doctor, date, time } = req.body;

    // Validate required fields
    if (!doctor || !date || !time) {
      return res.status(400).json({ message: "Doctor, date, and time are required to check conflict." });
    }

    // Check if there is already an appointment with the same doctor, date, and time
    const conflictAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
    });

    if (conflictAppointment) {
      return res.status(409).json({ message: "This appointment time is already booked by another user." });
    }

    // If no conflict, return success
    return res.status(200).json({ message: "No conflict, available for booking." });
  } catch (error) {
    console.error("Error checking appointment conflict:", error);
    res.status(500).json({ message: "Server error while checking appointment conflict." });
  }
};

// Create Appointment (Linked to the Logged-in User)
exports.createAppointment = async (req, res) => {
  try {
    const { doctor, date, time, reason, status } = req.body;

    // Check if all required fields are provided
    if (!doctor || !date || !time || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if there's already an appointment with the same doctor, date, and time
    const conflictAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
    });

    if (conflictAppointment) {
      return res.status(400).json({ message: "This appointment time is already booked by another user." });
    }

    // Create a new appointment if no conflict
    const newAppointment = new Appointment({
      userId: req.userId, // Link to the logged-in user
      doctor,
      date,
      time,
      reason,
      status,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Appointments for the Logged-in User
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId }).sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Appointment (Only if it belongs to the logged-in user)
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: id, userId: req.userId }, // Ensure the user owns the appointment
      updatedData,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found or unauthorized" });
    }

    res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Appointment (Only if it belongs to the logged-in user)
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await Appointment.findOneAndDelete({
      _id: id,
      userId: req.userId, // Ensure only the owner can delete
    });

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found or unauthorized" });
    }

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
