import express from "express";
import reviewsController from "../../controllers/reviewsController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import reviewSchema from "../../validation/reviewSchemas.js";
import genericSchema from "../../validation/genericSchemas.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * A review object
 * @typedef {object} Review
 * @property {string} content - The review content
 */

/**
 * POST /api/review
 * @summary Create a review
 * @tags Reviews
 * @param {Review} request.body.required - review info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post("", verifyToken, validationMiddleware({ body: reviewSchema.createReviewSchema }), controllerWrapper(reviewsController.createReview));

/**
 * PATCH /api/review/:id
 * @summary Update a review
 * @tags Reviews
 * @param {string} id.params.required - review id
 * @param {Review} request.body.required - review info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.patch("/:id", verifyToken, validationMiddleware({ body: reviewSchema.updateReviewSchema, params: genericSchema.paramsId }), controllerWrapper(reviewsController.updateReview));

/** 
 * DELETE /api/review/:id
 * @summary Delete a review
 * @tags Reviews
 * @param {string} id.params.required - review id
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
*/
router.delete("/:id", verifyToken, validationMiddleware({ params: genericSchema.paramsId }), controllerWrapper(reviewsController.deleteReview));

export default router;
