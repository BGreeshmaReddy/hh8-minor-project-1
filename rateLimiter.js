const redisClient = require("./redisClient");

const RATE_LIMIT = 5;//Number of requests
const TIME_WINDOW = 60; // seconds

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;

    const currentCount = await redisClient.incr(ip);

    if (currentCount === 1) {
      await redisClient.expire(ip, TIME_WINDOW);
    }

    if (currentCount > RATE_LIMIT) {
      return res.status(429).json({
        message: "❌ Too many requests. Try again later."
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = rateLimiter; // ⚠️ THIS LINE IS CRITICAL
