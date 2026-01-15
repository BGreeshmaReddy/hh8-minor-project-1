const redisClient = require("./redisClient");

async function test() {
  await redisClient.set("name", "Lumina");
  const value = await redisClient.get("name");
  console.log(value);
}

test();
