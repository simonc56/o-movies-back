import express from "express";
import profilController from "../../controllers/profilController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * A user object 
 * @typedef {object} User
 * @property {number} id - The user token
 * @property {string} firstname - The user firstname
 * @property {string} lastname - The user lastname
 * @property {string} email - The user email
 * @property {string} birthdate - The user birthdate
 * @property {string} created_at - The user created_at
 * @property {string} updated_at - The user updated_at
 * @property {number} count_review - The user count review
 * @property {number} count_rating - The user count rating
 */

/**
 * GET /api/profile
 * @summary The profil of a user connected
 * @tags Profile
 * @return {User} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.get("", verifyToken, controllerWrapper(profilController.getProfil));

export default router;
