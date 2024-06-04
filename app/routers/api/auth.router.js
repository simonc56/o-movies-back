import express from "express";
import authController from "../../controllers/authController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import userSchema from "../../validation/userSchemas.js";

const router = express.Router();

/**
 * A user object 
 * @typedef {object} UserLogin
 * @property {string} email - The user email
 * @property {string} password - The user password
 */

/**
 * A user object 
 * @typedef {object} UserRegister
 * @property {string} email - The user email
 * @property {string} password - The user password
 * @property {string} firstname - The user firstname
 * @property {string} lastname - The user lastname
 * @property {string} birthdate - The user birthdate
 */

/** POST /api/auth/login
 * @summary Login a user
 * @tags Auth
 * @param {UserLogin} request.body.required - user info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post("/login", validationMiddleware({ body: userSchema.signInSchema }), 
  controllerWrapper(authController.loginUser));

/**
 * POST /api/auth/register
 * @summary Register a user
 * @tags Auth
 * @param {UserRegister} request.body.required - user info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post("/register", validationMiddleware({ body: userSchema.registerSchema }), 
  controllerWrapper(authController.registerUser));


  
export default router;
