const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ================= DATABASE CONNECTION =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "R@o@o@t@123",
  database: "mobile_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// ================= REGISTER API =================
app.post("/register", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const checkUser = "SELECT * FROM users WHERE username = ?";
  db.query(checkUser, [username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const insertUser =
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";

    db.query(insertUser, [username, password, role], (err) => {
      if (err) {
        return res.status(500).json({ message: "Registration failed" });
      }

      res.status(200).json({ message: "Registration successful" });
    });
  });
});

// ================= LOGIN API =================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      user_id: result[0].id,
      role: result[0].role,
    });
  });
});

// ================= START SERVER =================
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
