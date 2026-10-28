
const logger = (req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
};

const checkKey = (req, res, next) => {
  const apiKey = process.env.API_KEY;
  console.log("Loaded API_KEY:", process.env.API_KEY);
  console.log("Received key:", req.query.key);

  if (!apiKey || req.query.key !== apiKey) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }

  next();
};

module.exports = { logger, checkKey };
