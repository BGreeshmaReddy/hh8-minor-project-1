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
