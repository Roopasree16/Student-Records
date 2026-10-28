
const express = require("express");

const app = express();
app.use(express.json());

let students = [
  {
    _id: "1",
    name: "Asha",
    usn: "1RV26CS001",
    email: "asha@example.com",
    department: "CSE",
  },
  {
    _id: "2",
    name: "Rahul",
    usn: "1RV26EC002",
    email: "rahul@example.com",
    department: "ECE",
  },
];

// GET all students, with optional department filter
app.get("/students", (req, res) => {
  const { department } = req.query;

  if (department) {
    return res.json(
      students.filter((s) => s.department === department)
    );
  }

  res.json(students);
});

// GET one student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s._id === req.params.id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(student);
});

// CREATE a student
app.post("/students", (req, res) => {
  const newStudent = {
    _id: String(Date.now()),
    ...req.body,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// UPDATE a student
app.put("/students/:id", (req, res) => {
  const student = students.find((s) => s._id === req.params.id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  Object.assign(student, req.body);
  res.json(student);
});

// DELETE a student
app.delete("/students/:id", (req, res) => {
  const exists = students.some((s) => s._id === req.params.id);

  if (!exists) {
    return res.status(404).json({ error: "Student not found" });
  }

  students = students.filter((s) => s._id !== req.params.id);
  res.json({ message: "Student deleted" });
});

app.listen(4000, () => {
  console.log("CRUD demo running on http://localhost:4000");
});
