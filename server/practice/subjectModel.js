
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  credits: { type: Number, min: 1, max: 5 },
  department: {
    type: String,
    enum: ["CSE", "ISE", "ECE", "ME"],
    default: "CSE",
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

async function check(data) {
  try {
    await new Subject(data).validate();
    console.log("Valid:", data);
  } catch (err) {
    console.log("Invalid:", Object.keys(err.errors));
  }
}

check({ name: "Data Structures", credits: 4 });
check({ credits: 4 });
check({ name: "Robotics", credits: 9, department: "MBA" });
