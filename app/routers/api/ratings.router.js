import express from "express";
import ratingsController from "../../controllers/ratingsController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import ratingSchema from "../../validation/ratingSchemas.js";
import genericSchema from "../../validation/genericSchemas.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * A CreateRating object
 * @typedef {object} CreateRating
 * @property {number} value - The rating value
 * @property {number} tmdb_id - The tmdb id
 */

/** A updateRating object
 * @typedef {object} UpdateRating
 * @property {number} value - The rating value
 */

/**
 * POST /api/rating
 * @summary Create a rating
 * @tags Ratings
 * @param {CreateRating} request.body.required - rating info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post("/rating", verifyToken, validationMiddleware({ body: ratingSchema.createRatingSchema }), controllerWrapper(ratingsController.createRating));

/**
 * PATCH /api/rating/:id
 * @summary Update a rating
 * @tags Ratings
 * @param {string} id.params.required - rating id
 * @param {UpdateRating} request.body.required - rating info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.patch("/rating/:id", verifyToken, validationMiddleware({ body: ratingSchema.updateRatingSchema, params: genericSchema.paramsId }), controllerWrapper(ratingsController.updateRating));

/**
 * DELETE /api/rating/:id
 * @summary Delete a rating
 * @tags Ratings
 * @param {string} id.params.required - rating id
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.delete("/rating/:id", verifyToken, validationMiddleware({ params: genericSchema.paramsId }), controllerWrapper(ratingsController.deleteRating));

export default router;
