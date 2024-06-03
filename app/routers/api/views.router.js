import express from "express";
import viewsController from "../../controllers/viewsController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import viewSchemas from "../../validation/viewSchemas.js";
import genericSchema from "../../validation/genericSchemas.js";
import verifyToken from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, validationMiddleware({ body: viewSchemas.viewedSchema }), controllerWrapper(viewsController.createMediaAsViewed));
router.delete("/:id", verifyToken, validationMiddleware({ params: genericSchema.paramsId }), controllerWrapper(viewsController.deleteMediaAsViewed));

export default router;

