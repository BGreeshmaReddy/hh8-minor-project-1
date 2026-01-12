# hh8-minor-project-1
# API Rate Limiter

## Description
This project implements an API Rate Limiter to prevent abuse and protect
backend services from DoS attacks by limiting requests per user.

## Technologies Used
- Node.js
- Express.js
- Redis

## Features
- Limits requests per user per minute
- Redis-based fast request counting
- Leaky Bucket algorithm for smooth traffic control

## Use Case
Helps prevent API abuse and improves security and performance.

## Internship
Developed as part of internship at HackerHub LLP.
## Current Status
- Express server setup completed
- Redis Cloud configured
- Rate limiter middleware implemented
- Facing SSL compatibility issue with Node.js (to be resolved)

## Next Steps
- Resolve Redis SSL connection issue
- Final testing of rate limiting
- Documentation cleanup

