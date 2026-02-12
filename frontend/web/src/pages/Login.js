import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("citizen");

  const handleLogin = (e) => {
    e.preventDefault();

    localStorage.setItem("userRole", role);

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="app-title">Citizen Assist</h1>
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleLogin} className="login-form">

          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />

          {/* 🔥 Role Selection */}
          <div className="role-container">

            <div
              className={`role-card ${role === "citizen" ? "active-citizen" : ""}`}
              onClick={() => setRole("citizen")}
            >
              👤 Citizen
            </div>

            <div
              className={`role-card admin-role ${role === "admin" ? "active-admin" : ""}`}
              onClick={() => setRole("admin")}
            >
              🛡 Admin
            </div>

          </div>

          <button
            type="submit"
            className={`login-btn ${role === "admin" ? "admin-btn" : ""}`}
          >
            Login as {role}
          </button>

        </form>

        <p className="register-text">
          Don’t have account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
