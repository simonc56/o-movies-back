import express from "express";
import ratingsController from "../../controllers/ratingsController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import ratingSchema from "../../validation/ratingSchemas.js";
import genericSchema from "../../validation/genericSchemas.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, validationMiddleware({ body: ratingSchema.createRatingSchema }), controllerWrapper(ratingsController.createRating));
router.patch("/:id", verifyToken, validationMiddleware({ body: ratingSchema.updateRatingSchema, params: genericSchema.paramsId }), controllerWrapper(ratingsController.updateRating));
router.delete("/:id", verifyToken, validationMiddleware({ params: genericSchema.paramsId }), controllerWrapper(ratingsController.deleteRating));

export default router;
