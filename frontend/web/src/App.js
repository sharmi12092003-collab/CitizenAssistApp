import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Complaint from "./pages/Complaint";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";

import "./theme.css";

function App() {

  const [theme, setTheme] = useState("light");

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  // 🔐 Role Protected Route
  const RoleProtectedRoute = ({ children, allowedRole }) => {
    const role = localStorage.getItem("userRole");

    if (!role) {
      return <Navigate to="/" />;
    }

    if (role !== allowedRole) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>

      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀ Light"}
      </button>

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Citizen Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RoleProtectedRoute allowedRole="citizen">
              <Dashboard />
            </RoleProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRole="admin">
              <Admin />
            </RoleProtectedRoute>
          }
        />

        {/* Complaint Page (Citizen Only) */}
        <Route
          path="/complaint"
          element={
            <RoleProtectedRoute allowedRole="citizen">
              <Complaint />
            </RoleProtectedRoute>
          }
        />

        {/* Unknown Route Redirect */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </Router>
  );
}

export default App;
