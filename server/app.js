
const express = require("express");
const cors = require("cors");

const { logger, checkKey } = require("./middleware/requestMiddleware");
const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Global middleware — runs before the routes
app.use(cors());
app.use(express.json());
app.use(logger);

// Root route
app.get("/", (req, res) => {
  res.send("StudentDesk API is running");
});

// Protected route
app.get("/secret", checkKey, (req, res) => {
  res.json({ message: "Access Granted" });
});

// API routes
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);

module.exports = app;
