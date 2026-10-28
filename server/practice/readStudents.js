
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "students.json");

fs.readFile(file, "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err.message);
    return;
  }

  const students = JSON.parse(data);
  console.log("Students loaded:", students.length);
});

console.log("This prints first!");
