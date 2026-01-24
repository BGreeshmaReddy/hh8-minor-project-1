const redisClient = require("./redisClient");

const rateLimiter = (limit = 5, windowSec = 60) => {
  return async (req, res, next) => {
    try {
      const key = `rate:${req.ip}`;

      const count = await redisClient.incr(key);

      if (count === 1) {
        await redisClient.expire(key, windowSec);
      }

      const ttl = await redisClient.ttl(key);

      // Always send headers (VERY IMPORTANT)
      res.setHeader("X-RateLimit-Limit", limit);
      res.setHeader("X-RateLimit-Used", count);
      res.setHeader("X-RateLimit-Remaining", Math.max(limit - count, 0));
      res.setHeader("X-RateLimit-Reset", ttl);

      if (count > limit) {
        return res.status(429).json({
          error: "Too many requests",
          retry_after: ttl
        });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Rate limiter error" });
    }
  };
};

module.exports = rateLimiter;
