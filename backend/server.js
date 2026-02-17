const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* =========================
   DATABASE CONNECTION
========================= */

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "R@o@o@t@123",
  database: "citizenassist"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected...");
  }
});

/* =========================
   REGISTER API
========================= */

app.post("/register", (req, res) => {
  const { username, name, email, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  const checkUser = "SELECT * FROM users WHERE username = ?";

  db.query(checkUser, [username], (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const sql = `
      INSERT INTO users (username, name, email, password, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [username, name, email, password, role], (err) => {
      if (err) {
        return res.status(500).json({ message: "Registration failed" });
      }

      res.json({ success: true, message: "User registered successfully" });
    });
  });
});

/* =========================
   LOGIN API
========================= */

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid Username" });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    res.json({
      success: true,
      role: user.role,
      user_id: user.id
    });
  });
});

/* =========================
   ADD COMPLAINT
========================= */

app.post("/add-complaint", (req, res) => {
  const { user_id, complaint_text } = req.body;

  if (!complaint_text) {
    return res.status(400).json({ message: "Complaint text required" });
  }

  const sql =
    "INSERT INTO complaints (user_id, complaint_text) VALUES (?, ?)";

  db.query(sql, [user_id, complaint_text], (err) => {
    if (err) {
      return res.status(500).json({ message: "Error saving complaint" });
    }

    res.json({ success: true, message: "Complaint saved successfully" });
  });
});

/* =========================
   GET ALL COMPLAINTS (ADMIN)
========================= */

app.get("/complaints", (req, res) => {
  const sql = `
    SELECT complaints.id, users.username, complaints.complaint_text, complaints.created_at
    FROM complaints
    JOIN users ON complaints.user_id = users.id
    ORDER BY complaints.created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    res.json(result);
  });
});

/* =========================
   START SERVER
========================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
