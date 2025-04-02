import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://backend-ip1x.onrender.com/api/auth/forgot-password", {
        email,
      });

      if (response.data.success) {
        setMessage("✅ Password reset link has been sent to your email.");
      } else {
        setError(response.data.message || "⚠️ Failed to send reset link.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleResetRequest}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      <p>
        Remembered your password? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default ForgotPassword;
