// Redis-based API Rate Limiter middleware
// Prevents API abuse by limiting requests per IP

const redis = require("redis");

const client = redis.createClient({
  username: "default",
  password: "CP4AgHM2RRaR8P3d2gAsl3D5sOoitK6",
  socket: {
    host: "redis-10179.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 10179,
    tls: true,
    rejectUnauthorized: false
  }
});

client.on("error", (err) => {
  console.error("Redis Client Error:", err.message);
});

(async () => {
  await client.connect();
  console.log("Redis connected successfully");
})();
const rateLimiter = async (req, res, next) => {
  try {
    console.log("Rate limiter middleware executed");

    const key = `rate:${req.ip}`;
    const count = await client.incr(key);

    if (count === 1) {
      await client.expire(key, 60);
    }

    if (count > 10) {
      return res.status(429).json({
        message: "Too many requests. Please slow down."
      });
    }

    next();
  } catch (err) {
    console.error("Rate limiter error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Middleware executes before API routes to control traffic

