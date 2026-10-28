
const fs = require("fs");
const path = require("path");

async function countByDept() {
  const file = path.join(__dirname, "students.json");

  try {
    const data = await fs.promises.readFile(file, "utf-8");
    const students = JSON.parse(data);

    const count = students.filter(
      (student) => student.department === "CSE"
    ).length;

    console.log("CSE students:", count);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

countByDept();
