import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([
    { id: 101, user: "Ravi", dept: "Water", status: "Pending" },
    { id: 102, user: "Anita", dept: "Electricity", status: "Resolved" },
    { id: 103, user: "Kumar", dept: "Roads", status: "In Progress" },
  ]);

  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const updateStatus = (id) => {
    const updated = complaints.map((c) =>
      c.id === id ? { ...c, status: "Resolved" } : c
    );
    setComplaints(updated);
  };

  const filteredComplaints = complaints.filter((c) =>
    c.user.toLowerCase().includes(search.toLowerCase())
  );

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
          <li className="logout" onClick={handleLogout}>🚪 Logout</li>
        </ul>
      </div>

      {/* Main */}
      <div className="admin-main">

        <div className="admin-topbar">
          <h1>Administrator Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="admin-cards">
          <div className="admin-card">
            <h3>Total Complaints</h3>
            <p>{complaints.length}</p>
          </div>

          <div className="admin-card">
            <h3>Pending</h3>
            <p>{complaints.filter(c => c.status === "Pending").length}</p>
          </div>

          <div className="admin-card">
            <h3>Resolved</h3>
            <p>{complaints.filter(c => c.status === "Resolved").length}</p>
          </div>
        </div>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="admin-table">
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
              {filteredComplaints.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.user}</td>
                  <td>{c.dept}</td>
                  <td>{c.status}</td>
                  <td>
                    {c.status !== "Resolved" && (
                      <button
                        className="resolve-btn"
                        onClick={() => updateStatus(c.id)}
                      >
                        Mark Resolved
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default Admin;
