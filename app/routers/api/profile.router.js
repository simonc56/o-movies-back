import express from "express";
import profilController from "../../controllers/profilController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * GET /api/profile
 * @summary The profil of a user connected
 * @tags Profile
 * @return {User} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.get("/profile", verifyToken, controllerWrapper(profilController.getProfil));

export default router;
