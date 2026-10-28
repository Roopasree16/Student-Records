
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Logger middleware: runs for every request
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url} at ${new Date().toLocaleTimeString()}`
  );
  next();
});

// Protected route middleware
function checkKey(req, res, next) {
  if (req.query.key !== "123") {
    return res.status(401).json({ error: "No access" });
  }

  next();
}

// Public route
app.get("/", (req, res) => {
  res.send("Open to everyone");
});

// Protected route
app.get("/secret", checkKey, (req, res) => {
  res.send("Welcome, admin!");
});

app.listen(PORT, () => {
  console.log(`Middleware demo running on http://localhost:${PORT}`);
});
