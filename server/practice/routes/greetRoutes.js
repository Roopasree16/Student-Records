const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello, students" });
});

router.get("/:name", (req, res) => {
  res.json({ message: `Hello, ${req.params.name}` });
});

module.exports = router;