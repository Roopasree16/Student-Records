
import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/courses";

const emptyForm = {
  name: "",
  code: "",
  credits: "",
  department: "",
};

function CourseSection() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  async function loadCourses() {
    try {
      const res = await fetch(API);

      if (!res.ok) {
        throw new Error("Failed to load courses");
      }

      const data = await res.json();
      setCourses(data);
      setError("");
    } catch {
      setError("Could not load courses. Check that the backend is running.");
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  async function addCourse(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          credits: Number(form.credits),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Could not add course");
      }

      setCourses((current) => [...current, data]);
      setForm({ ...emptyForm });
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteCourse(id) {
    setError("");

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Could not delete course");
      }

      setCourses((current) =>
        current.filter((course) => course._id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="course-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">COURSE ADMINISTRATION</p>
          <h1>Courses</h1>
          <p className="subtitle">
            Manage course details and credits.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowForm((current) => !current)}
        >
          {showForm ? "Close Form" : "+ Add Course"}
        </button>
      </div>

      {error && <p className="course-error" role="alert">{error}</p>}

      {showForm && (
        <form className="student-form course-form" onSubmit={addCourse}>
          <label>
            Course Name
            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Enter course name"
            />
          </label>

          <label>
            Course Code
            <input
              required
              value={form.code}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value })
              }
              placeholder="Enter course code"
            />
          </label>

          <label>
            Credits
            <input
              required
              type="number"
              min="1"
              max="5"
              value={form.credits}
              onChange={(e) =>
                setForm({ ...form, credits: e.target.value })
              }
              placeholder="Enter credits (1–5)"
            />
          </label>

          <label>
            Department
            <select
              required
              value={form.department}
              onChange={(e) =>
                setForm({ ...form, department: e.target.value })
              }
            >
              <option value="" disabled>
                Select department
              </option>
              <option value="CSE">CSE</option>
              <option value="ISE">ISE</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
            </select>
          </label>

          <button
            className="primary-btn save-course-btn"
            type="submit"
          >
            Save Course
          </button>
        </form>
      )}

      <section className="summary">
        <div>
          <span>Total Courses</span>
          <h2>{courses.length}</h2>
        </div>
        <div className="summary-icon" aria-hidden="true">
          ▤
        </div>
      </section>

      {courses.length === 0 ? (
        <p className="empty-courses">
          No courses found. Add your first course!
        </p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <article className="course-card" key={course._id}>
              <h3>{course.name}</h3>
              <p>
                <strong>Code:</strong> {course.code}
              </p>
              <p>
                <strong>Credits:</strong> {course.credits}
              </p>
              <p>
                <strong>Department:</strong> {course.department}
              </p>
              <button
                className="delete-course-btn"
                type="button"
                onClick={() => deleteCourse(course._id)}
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default CourseSection;
