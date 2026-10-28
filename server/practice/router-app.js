
const express = require("express");
const greetRoutes = require("./routes/greetRoutes");

const app = express();
const PORT = 4000;

// Log every incoming request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Mount greeting routes
app.use("/api/greet", greetRoutes);

app.listen(PORT, () => {
  console.log(`Router demo running on http://localhost:${PORT}`);
});
