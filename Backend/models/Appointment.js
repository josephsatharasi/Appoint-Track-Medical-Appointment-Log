const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate appointment with a user
  doctor: { type: String, required: true },
  date: { type: String, required: true }, // Store as string (YYYY-MM-DD)
  time: { type: String, required: true }, // Store as string (HH:MM AM/PM)
  reason: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Upcoming", "Completed", "Cancelled"], 
    default: "Upcoming" 
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
