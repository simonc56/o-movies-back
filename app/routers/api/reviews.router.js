import express from "express";
import reviewsController from "../../controllers/reviewsController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import reviewSchema from "../../validation/reviewSchemas.js";
import genericSchema from "../../validation/genericSchemas.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, validationMiddleware({ body: reviewSchema.createReviewSchema }), controllerWrapper(reviewsController.createReview));
router.patch("/:id", verifyToken, validationMiddleware({ body: reviewSchema.updateReviewSchema, params: genericSchema.paramsId }), controllerWrapper(reviewsController.updateReview));
router.delete("/:id", verifyToken, validationMiddleware({ params: genericSchema.paramsId }), controllerWrapper(reviewsController.deleteReview));

export default router;
