
const express = require("express");

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Welcome to StudentDesk");
});

app.get("/students", (req, res) => {
  res.json([
    { name: "Asha", department: "CSE" },
    { name: "Rahul", department: "ECE" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
