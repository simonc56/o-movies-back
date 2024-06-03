import express from "express";
import authController from "../../controllers/authController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import userSchema from "../../validation/userSchemas.js";

const router = express.Router();

router.post("/login", validationMiddleware({ body: userSchema.signInSchema }), controllerWrapper(authController.loginUser));
router.post("/register", validationMiddleware({ body: userSchema.registerSchema }), controllerWrapper(authController.registerUser));

export default router;
