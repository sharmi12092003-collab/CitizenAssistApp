import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();   // 👈 Add this

  const handleLogout = () => {      // 👈 Paste here
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Citizen Assist</h2>
        <ul>
          <li>🏠 Dashboard</li>
          <li>📝 File Complaint</li>
          <li>📄 My Complaints</li>
          <li>⚙ Settings</li>

          {/* 👇 Add onClick here */}
          <li className="logout" onClick={handleLogout}>
            🚪 Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">

        <div className="topbar">
          <h1>Dashboard</h1>
          <div className="profile-section">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="profile-img"
            />
            <span>Sharmi</span>
          </div>
        </div>

        <div className="card-grid">
          <div className="dashboard-card">
            <h3>Total Complaints</h3>
            <p>124</p>
          </div>

          <div className="dashboard-card">
            <h3>Pending</h3>
            <p>32</p>
          </div>

          <div className="dashboard-card">
            <h3>Resolved</h3>
            <p>92</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
