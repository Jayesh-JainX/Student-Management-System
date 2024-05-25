// MySQL Connection

// server.js
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");

  // Create Table
  let sql =
    "CREATE TABLE IF NOT EXISTS students(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), rollNo VARCHAR(255), branch VARCHAR(255), prn VARCHAR(255), semester VARCHAR(255))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Students table created");
  });
});

// Insert Student
app.post("/addstudent", (req, res) => {
  let student = {
    name: req.body.name,
    email: req.body.email,
    rollNo: req.body.rollNo,
    branch: req.body.branch,
    prn: req.body.prn,
    semester: req.body.semester,
  };
  let sql = "INSERT INTO students SET ?";
  db.query(sql, student, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Student added...");
  });
});

// Get Students
app.get("/getstudents", (req, res) => {
  let sql = "SELECT * FROM students";
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

// Delete Student
app.delete("/deletestudent/:id", (req, res) => {
  let sql = `DELETE FROM students WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Student deleted...");
  });
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Server Listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
