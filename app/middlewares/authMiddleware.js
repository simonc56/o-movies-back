import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.js";

function verifyToken (req, res, next) {
  const token = req.headers["authorization"]?.slice(7); // get the token from the header
  if (!token) {
    return next (new ApiError(403,"No token provided!" )); // if there isn't any token
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET); // verify token
    req.userId = decoded.id; // add the user id to the request
    next();
  } catch (error){
    if (error) {
      console.log(error);
      return next(new ApiError(401,"Unauthorized!" ));
    }
  }
}

export default verifyToken;