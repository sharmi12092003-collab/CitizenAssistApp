import React from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");  // ✅ make consistent
    navigate("/");
  };

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <div className="admin-sidebar">
        <h2 className="logo">Admin Panel</h2>

        <ul>
          <li className="active">📊 Overview</li>
          <li>📄 Manage Complaints</li>
          <li>👥 Users</li>
          <li>⚙ Settings</li>

          <li className="logout" onClick={handleLogout}>
            🚪 Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-main">

        <div className="admin-topbar">
          <h1>Administrator Dashboard</h1>
        </div>

        <div className="admin-cards">
          <div className="admin-card total">
            <h3>Total Complaints</h3>
            <p>248</p>
          </div>

          <div className="admin-card pending">
            <h3>Pending</h3>
            <p>64</p>
          </div>

          <div className="admin-card resolved">
            <h3>Resolved</h3>
            <p>184</p>
          </div>

          <div className="admin-card users">
            <h3>Total Users</h3>
            <p>120</p>
          </div>
        </div>

        <div className="admin-table">
          <h2>Complaint Management</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>#201</td>
                <td>Ravi</td>
                <td>Water</td>
                <td><span className="badge pending">Pending</span></td>
                <td>
                  <button className="btn-resolve">Resolve</button>
                </td>
              </tr>

              <tr>
                <td>#202</td>
                <td>Anita</td>
                <td>Electricity</td>
                <td><span className="badge resolved">Resolved</span></td>
                <td>
                  <button className="btn-view">View</button>
                </td>
              </tr>

              <tr>
                <td>#203</td>
                <td>Kumar</td>
                <td>Roads</td>
                <td><span className="badge inprogress">In Progress</span></td>
                <td>
                  <button className="btn-progress">Update</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Admin;
