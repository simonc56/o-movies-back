import express from "express";
import viewsController from "../../controllers/viewsController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import viewSchemas from "../../validation/viewSchemas.js";
import genericSchema from "../../validation/genericSchemas.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * A view object
 * @typedef {object} View
 * @property {number} tmdb_id - The tmdb id
 */

/**
 * POST /api/view
 * @summary Create a media as viewed
 * @tags Views
 * @param {View} request.body.required - view info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post("/", verifyToken, validationMiddleware({ body: viewSchemas.viewedSchema }), 
  controllerWrapper(viewsController.createMediaAsViewed));

/**
 * DELETE /api/view/:id
 * @summary Delete a media as viewed
 * @tags Views
 * @param {string} id.params.required - view info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.delete("/:id", verifyToken, validationMiddleware({ params: genericSchema.paramsId }), 
  controllerWrapper(viewsController.deleteMediaAsViewed));

export default router;