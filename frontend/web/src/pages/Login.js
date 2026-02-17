import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Save real data from DB
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("userRole", data.role);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="app-title">Citizen Assist</h1>
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleLogin} className="login-form">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Role Selection */}
          <div className="role-container">

            <div
              className={`role-card ${role === "citizen" ? "active-citizen" : ""}`}
              onClick={() => setRole("citizen")}
            >
              Citizen
            </div>

            <div
              className={`role-card ${role === "admin" ? "active-admin" : ""}`}
              onClick={() => setRole("admin")}
            >
              Admin
            </div>

          </div>

          <button type="submit" className="login-btn">
            Login as {role}
          </button>

          <p>
            Don’t have account? <Link to="/register">Register</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;
