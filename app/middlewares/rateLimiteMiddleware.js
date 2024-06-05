import rateLimit from "express-rate-limit";

// Rate limiter middleware to limit the number of requests a user can make to the server
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5000, 
});

export default rateLimiter;