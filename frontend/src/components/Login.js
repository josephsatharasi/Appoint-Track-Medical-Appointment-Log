import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("❌ Email and Password are required!");
      return;
    }

    try {
      // Make the POST request to login
      const response = await axios.post("https://backend-ip1x.onrender.com/api/auth/login", { email, password });

      if (response.data.success) {
        toast.success("✅ Login successful!");

        // Save the token in localStorage
        localStorage.setItem("token", response.data.token);

        // Redirect to the dashboard
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(response.data.message || "❌ Invalid credentials");
      }
    } catch (err) {
      // Enhanced error message handling
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "❌ Something went wrong during login!");
      } else {
        toast.error("❌ Network or server error. Please try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
      
      <p>
        <a href="/forgot-password">Forgot Password?</a>
      </p>
      <p>
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
};

export default Login;
