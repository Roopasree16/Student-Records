function StudentList({ students, onDelete }) {
  return (
    <section className="table-card">
      <div className="table-heading">
        <div>
          <h2>All Students</h2>
          <p>Student directory and details</p>
        </div>
        <span className="count">{students.length} records</span>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>STUDENT</th>
              <th>USN</th>
              <th>EMAIL</th>
              <th>DEPARTMENT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="student-name">{student.name}</td>
                <td>{student.usn}</td>
                <td>{student.email}</td>
                <td>
                  <span className="department">{student.department}</span>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(student._id)}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td colSpan={5} className="empty">
                  No student records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default StudentList;
