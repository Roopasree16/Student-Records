import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./index.css";

const API = "http://localhost:5000/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  async function addStudent(student) {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

    if (!res.ok) throw new Error("Could not add student");

    const savedStudent = await res.json();
    setStudents((current) => [...current, savedStudent]);
    setShowForm(false);
  }

  async function deleteStudent(id) {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });

    if (!res.ok) {
      alert("Could not delete student");
      return;
    }

    setStudents((current) => current.filter((student) => student._id !== id));
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="page-heading">
          <div>
            <p className="eyebrow">STUDENT ADMINISTRATION</p>
            <h1>Student Records</h1>
            <p className="subtitle">
              Manage student information in one place.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={() => setShowForm((current) => !current)}
          >
            {showForm ? "Close Form" : "+ Add Student"}
          </button>
        </section>

        {showForm && <StudentForm onAdd={addStudent} />}

        <section className="summary">
          <div>
            <span>Total Students</span>
            <h2>{students.length}</h2>
          </div>
          <div className="summary-icon" aria-hidden="true">♙</div>
        </section>

        <StudentList students={students} onDelete={deleteStudent} />
      </main>
    </>
  );
}

export default App;

