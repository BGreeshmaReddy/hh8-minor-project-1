const express = require("express");
const rateLimiter = require("./rateLimiter");

const app = express();
const PORT = 3000;

// Serve frontend files
app.use(express.static("public"));

// Rate-limited API
app.get("/api/request", rateLimiter(5, 60), (req, res) => {
  res.json({ message: "Request allowed" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
