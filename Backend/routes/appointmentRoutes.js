const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  checkAppointmentConflict, // Import new conflict check function
} = require("../controllers/appointmentController");
const verifyToken = require("../middleware/authMiddleware");

// New route for checking appointment conflicts
router.post("/check-conflict", verifyToken, checkAppointmentConflict); // Add this route for conflict checking

router.post("/", verifyToken, createAppointment);
router.get("/", verifyToken, getAppointments);
router.put("/:id", verifyToken, updateAppointment);
router.delete("/:id", verifyToken, deleteAppointment);

module.exports = router;
