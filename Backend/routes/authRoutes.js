const express = require("express");
const { signup, login, forgotPassword, resetPassword } = require("../controllers/authController");

const router = express.Router();

// User authentication routes
router.post("/signup", signup);
router.post("/login", login);

// Password recovery routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword); // PATCH is better for updating passwords

module.exports = router;

