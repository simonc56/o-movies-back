import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.js";
import { hashToken } from "../utils/auth.js";

async function verifyToken(req, _, next) {
  try {
    const token = req.headers["authorization"]?.slice(7);
    const fingerprint = req.cookies?.fingerprint;
    if (!token || !fingerprint) {
      return next(new ApiError(401, "No token or fingerprint provided!"));
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET); // verify token
    const hashedFingerprint = hashToken(fingerprint);
    if (decoded.fingerprint !== hashedFingerprint) {
      return next(new ApiError(401, "Invalid fingerprint"));
    }
    req.userId = decoded.id; // add the user id to the request
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, "Invalid token"));
    } else if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError(401, "Token expired"));
    } else {
      return next(new ApiError(500, "Internal server error"));
    }
  }
}

export { verifyToken };
