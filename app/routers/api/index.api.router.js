// Initialize express router
import express from "express";
import moviesController from "../../controllers/moviesController.js";
import authController from "../../controllers/authController.js";
import reviewsController from "../../controllers/reviewsController.js";
import viewsController from "../../controllers/viewsController.js";
import verifyToken from "../../middlewares/authMiddleware.js";
import ratingsController from "../../controllers/ratingsController.js";
import playlistController from "../../controllers/playlistController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import userSchema from "../../validation/userSchemas.js";
import movieSchema from "../../validation/movieSchemas.js";
import reviewSchema from "../../validation/reviewSchemas.js";
import ratingSchema from "../../validation/ratingSchemas.js";
import genericSchema from "../../validation/genericSchemas.js";
import viewSchemas from "../../validation/viewSchemas.js";
import playlistSchema from "../../validation/playlistSchemas.js";
import profilController from "../../controllers/profilController.js";

const router = express.Router();

/**
 * A api success object
 * @typedef {object} ApiSuccess
 * @property {string} status - The Json status Property
 * @property {object} data - The data object
 */

/**
 * A api error object
 * @typedef {object} ApiError
 * @property {string} status - The Json status Property
 * @property {string} error - Error description
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
 * @property {number} id - The user token
 */

/**
 * A user object 
 * @typedef {object} UserLogin
 * @property {string} email - The user email
 * @property {string} password - The user password
 */

/**
 * A view object
 * @typedef {object} View
 * @property {number} tmdb_id - The tmdb id
 */

/**
 * A playlist object
 * @typedef {object} Playlist
 * @property {string} name - The playlist name
 * @property {number} user_id - The user id
 * @property {number} id - The playlist id
 * @property {string} created_at - The playlist created_at
 * @property {string} updated_at - The playlist updated_at
 */

/**
 * A CreatePlaylist object
 * @typedef {object} CreatePlaylist
 * @property {string} name - The playlist name
 */

/**
 * A AddOrDeleteMovie object
 * @typedef {object} AddOrDeleteMovie
 * @property {number} tmdb_id - The tmdb id
 */

/**
 * A review object
 * @typedef {object} Review
 * @property {string} content - The review content
 */

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
 * A movie object
 * @typedef {object} Movie
 * @property {number} id - The movie id
 * @property {string} title_fr - The movie title in french
 * @property {string} original_title - The movie original title
 * @property {boolean} adult - The movie adult
 * @property {string} release_date - The movie release date
 * @property {number} budget - The movie budget
 * @property {number} popularity - The movie popularity
 * @property {string} genres - The movie genres
 * @property {string} overview - The movie overview
 * @property {string} poster_path - The movie poster path
 * @property {string} cast - The movie cast
 * @property {string} crew - The movie crew
 */

/** POST /api/auth/login
 * @summary Login a user
 * @tags Auth
 * @param {UserLogin} request.body.required - user info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post("/auth/login",validationMiddleware({body : userSchema.signInSchema}),
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
router.post("/auth/register",validationMiddleware({body: userSchema.registerSchema}),
  controllerWrapper(authController.registerUser));

/**
 * POST /api/review
 * @summary Create a review
 * @tags Reviews
 * @param {Review} request.body.required - review info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post("/review", verifyToken,validationMiddleware({body : reviewSchema.createReviewSchema}),
  controllerWrapper(reviewsController.createReview));

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
router.patch("/review/:id", verifyToken,validationMiddleware({body : reviewSchema.updateReviewSchema, params: genericSchema.paramsId}), 
  controllerWrapper(reviewsController.updateReview));

/** 
 * DELETE /api/review/:id
 * @summary Delete a review
 * @tags Reviews
 * @param {string} id.params.required - review id
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
*/
router.delete("/review/:id", verifyToken,validationMiddleware({ params: genericSchema.paramsId }),
  controllerWrapper(reviewsController.deleteReview));

/**
 * POST /api/rating
 * @summary Create a rating
 * @tags Ratings
 * @param {CreateRating} request.body.required - rating info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post ("/rating",verifyToken,validationMiddleware({body : ratingSchema.createRatingSchema}),
  controllerWrapper(ratingsController.createRating));

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
router.patch ("/rating/:id", verifyToken,validationMiddleware({body : ratingSchema.updateRatingSchema, params: genericSchema.paramsId }),
  controllerWrapper(ratingsController.updateRating));

/**
 * DELETE /api/rating/:id
 * @summary Delete a rating
 * @tags Ratings
 * @param {string} id.params.required - rating id
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.delete ("/rating/:id", verifyToken,validationMiddleware({ params: genericSchema.paramsId } ),
  controllerWrapper(ratingsController.deleteRating));

/**
 * POST /api/view
 * @summary Create a media as viewed
 * @tags Views
 * @param {View} request.body.required - view info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post("/view", verifyToken, validationMiddleware({ body: viewSchemas.viewedSchema }),
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
router.delete("/view/:id", verifyToken, validationMiddleware({ params: genericSchema.paramsId }),
  controllerWrapper(viewsController.deleteMediaAsViewed));


export default router;

import express from "express";
import moviesRouter from "./moviesRouter.js";
import authRouter from "./authRouter.js";
import reviewsRouter from "./reviewsRouter.js";
import ratingsRouter from "./ratingsRouter.js";
import viewsRouter from "./viewsRouter.js";
import profileRouter from "./profileRouter.js";
import playlistsRouter from "./playlistsRouter.js";

const router = express.Router();

router.use("/movie", moviesRouter);
router.use("/auth", authRouter);
router.use("/review", reviewsRouter);
router.use("/rating", ratingsRouter);
router.use("/view", viewsRouter);
router.use("/profil", profileRouter);
router.use("/playlist", playlistsRouter);

export default router;