import express from "express";
import apiRouter from "./api/index.api.router.js";
import errorMiddleware from "../middlewares/errorMiddleware.js";

const router = express.Router();

router.use("/api", apiRouter);

router.use(errorMiddleware);

export default router;