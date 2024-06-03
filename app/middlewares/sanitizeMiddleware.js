import sanitizeHtml from "sanitize-html";

// Sanitize the body of the request to prevent XSS attacks
const bodySanitizer = (req, res, next) => {
  Object.keys(req.body).forEach(key => { 
    if (typeof req.body[key] === "string") {
      req.body[key] = sanitizeHtml(req.body[key]);
    }
  });
  next();
};

export default bodySanitizer;