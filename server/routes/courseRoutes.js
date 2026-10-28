
const express = require("express");
const router = express.Router();

const {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// GET all courses
router.get("/", getCourses);
router.get("/:id", getCourseById);
// POST a new course
router.post("/", addCourse);

// PUT update a course
router.put("/:id", updateCourse);

// DELETE a course
router.delete("/:id", deleteCourse);

module.exports = router;
