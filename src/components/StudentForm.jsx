import { useState } from "react";

function StudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("CSE");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await onAdd({ name, usn, email, department });
      setName("");
      setUsn("");
      setEmail("");
      setDepartment("CSE");
    } catch (error) {
      alert(error.message || "Could not add student");
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Add New Student</h2>

      <div className="form-grid">
        <input
          placeholder="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <input
          placeholder="USN / Student ID"
          value={usn}
          onChange={(event) => setUsn(event.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <select
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
        >
          <option value="CSE">Computer Science</option>
          <option value="ISE">Information Science</option>
          <option value="ECE">Electronics</option>
          <option value="ME">Mechanical</option>
        </select>
      </div>

      <button className="primary-btn" type="submit">
        Save Student
      </button>
    </form>
  );
}

export default StudentForm;
