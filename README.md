Redis-Based API Rate Limiter

->Overview of the project
<br>
hh8-minor-project-1
<br>
server.js → Starts server.
<br>
rateLimiter.js → Main logic
<br>
redisClient.js → Redis connection
<br>
testRedis.js → Test Redis
<br>
package.json → Project info
<br>
README.md → Documentation.



A backend project implementing an **API Rate Limiter** using **Node.js, Express, and Redis** to control and prevent excessive client requests within a defined time window.

->Project Overview

This project demonstrates how to protect APIs from abuse (such as spam requests or DDoS-like behavior) by limiting the number of requests a client can make in a given time period.
Redis is used as an **in-memory data store** to efficiently track request counts with automatic expiration.
Tech Stack

Node.js– JavaScript runtime
Express.js– Web framework for building APIs
Redis– In-memory data store for fast request counting
Git & GitHub** – Version control

->How It Works
1. Each incoming request passes through a **rate-limiting middleware**.
2. The client’s **IP address** is used as a unique key in Redis.
3. Redis:
Increments the request count for that IP
Sets a TTL (time-to-live) for automatic reset
4. If the request count exceeds the limit:
The API responds with **HTTP 429 (Too Many Requests)**.
5. After the time window expires, Redis automatically resets the counter.
Rate Limiting Logic
Max Requests:5
Time Window:60 seconds

Example:

IP: 192.168.1.10
Requests: 6 within 60 seconds → Blocked


->Project Structure

hh8-minor-project-1/
│
├── server.js          # Express server
├── rateLimiter.js     # Rate limiting middleware
├── redisClient.js     # Redis connection logic
├── package.json
├── package-lock.json
└── README.md

->How to Run the Project
1️⃣ Prerequisites
Node.js installed
Redis installed and running on port 6379
2️⃣ Install Dependencies
bash
npm install
3️⃣ Start the Server
bash
node server.js

->Server will start at:

http://localhost:3000
Testing the Rate Limiter

1. Open browser or Postman
2. Hit:
http://localhost:3000
3. Refresh more than 5 times within 60 seconds**
4. You will receive:
json
{
  "message": "Too many requests. Try again later."
}

Sample Response Codes

| Status Code | Meaning           |
| ----------- | ----------------- |
| 200         | Request allowed   |
| 429         | Too many requests |
| 500         | Server error      |

->Why Redis?
Extremely fast (in-memory)
Supports atomic operations (`INCR`)
Built-in key expiration (TTL)
Ideal for distributed systems

->Future Enhancements
User-based rate limiting (JWT / user ID)
Per-route rate limits
Configurable limits via environment variables
Logging & monitoring support

Author
Bhoompalle Greeshma Reddy
Backend Mini Project – API Security using Redis

->Conclusion

This project demonstrates a real-world backend concept used in production systems to improve API reliability, performance, and security.

NEXT STEP (VERY IMPORTANT)

After pasting this into README.md, run:

bash
git add README.md
git commit -m "Added professional README documentation"
git push origin main.



