const express = require("express");
const rateLimiter = require("./rateLimiter"); // path must match filename

const app = express();
const PORT = 3000;

app.use(rateLimiter); // middleware function

app.get("/", (req, res) => {
  res.send("✅ Request allowed");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
