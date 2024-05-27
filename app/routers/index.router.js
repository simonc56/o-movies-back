import express from "express";
import apiRouter from "./api/index.api.router.js";
import ApiError from "../errors/ApiError.js";

const router = express.Router();

router.use("/api", apiRouter);

// 404 error middleware if the route is not found return a 404 error
router.use((_, __, next) => {
  next(new ApiError(404, "Data not Found"));
});

export default router;