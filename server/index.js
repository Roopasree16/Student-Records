require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
console.log("App type:", typeof app);
console.log("App listen type:", typeof app.listen);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();