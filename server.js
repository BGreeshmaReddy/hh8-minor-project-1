const express = require("express");
const rateLimiter = require("./rateLimiter");

const app = express();

// Apply rate limiter middleware
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.send("API Rate Limiter Server is running 🚀");
});

app.get("/test", (req, res) => {
  res.json({ message: "Request successful" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
