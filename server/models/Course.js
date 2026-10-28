
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  department: {
    type: String,
    enum: ["CSE", "ISE", "ECE", "ME"],
    default: "CSE",
  },
});

module.exports = mongoose.model("Course", courseSchema);
