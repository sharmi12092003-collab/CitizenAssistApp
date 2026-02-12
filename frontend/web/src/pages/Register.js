import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="brand-title">Citizen Assist</h1>
        <p className="brand-subtitle">
          Digital Grievance Redressal System
        </p>

        <h2 className="welcome-text">Create Account ✨</h2>

        <form className="login-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>

        <p className="register-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
