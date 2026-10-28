
const http = require("http");

const students = [
  { name: "Asha", department: "CSE" },
  { name: "Rahul", department: "ECE" },
  { name: "Roopa", department: "ISE" },
];

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.url === "/") {
    res.end("Welcome to StudentDesk");
  } else if (req.url === "/students") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(students));
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
