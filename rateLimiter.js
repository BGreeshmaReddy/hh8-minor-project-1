const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => {
  console.log("Redis error:", err);
});

client.connect();

const rateLimiter = async (req, res, next) => {
  const key = `rate:${req.ip}`;

  const count = await client.incr(key);

  if (count === 1) {
    await client.expire(key, 60); // 1 minute window
  }

  if (count > 10) {
    return res.status(429).json({
      message: "Too many requests. Please slow down."
    });
  }

  next();
};

module.exports = rateLimiter;
