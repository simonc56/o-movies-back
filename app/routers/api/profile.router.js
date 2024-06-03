import express from "express";
import profilController from "../../controllers/profilController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, controllerWrapper(profilController.getProfil));

export default router;
