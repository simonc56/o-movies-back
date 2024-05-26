// Initialize express router
import express from "express";
import moviesController from "../../controllers/moviesController.js";
import authController from "../../controllers/authController.js";
import reviewsController from "../../controllers/reviewsController.js";
import verifyToken from "../../middlewares/authMiddleware.js";
import ratingsController from "../../controllers/ratingsController.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import userSchema from "../../validation/userSchemas.js";
import movieSchema from "../../validation/movieSchemas.js";
import reviewSchema from "../../validation/reviewSchemas.js";
import ratingSchema from "../../validation/ratingSchemas.js";


const router = express.Router();
/**
 * A api success object
 * @typedef {object} ApiSuccess
 * @property {string} status - The Json status Property
 
 */

/**
 * A api error object
 * @typedef {object} ApiError
 * @property {string} status - The Json status Property
 * @property {string} message - Error description
 */

/**
 * A user object 
 * @typedef {object} User
 * @property {string} email - The user email
 * @property {string} password - The user password
 * @property {string} firstname - The user firstname
 * @property {string} lastname - The user lastname
 * @property {string} birthdate - The user birthdate
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

// drop down menu for sorting criteria
/**
 * @typedef {string} Sort_by
 * @enum {string}
 */
/**
 * GET /api/movie/:id
 * @summary get a movie
 * @param {integer} id.params.required - movie id
 * @return {Movie} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */

router.get("/movie/:id", controllerWrapper(moviesController.getMoviesById) );

/**get /api/movies 
 * @summary get movies with parameters
 * @param {string} sort_by.query - Sorting criteria
 *       ['popularity.asc', 'popularity.desc',
 *        'release_date.asc', 'release_date.desc',
 *         'revenue.asc', 'revenue.desc', 'primary_release_date.asc',
 *          'primary_release_date.desc', 'title.asc', 'title.desc',
 *           'vote_average.asc', 'vote_average.desc', 'vote_count.asc', 'vote_count.desc']
 * @param {string} page.query - movie page
 * @param {string} include_adult.query - include adult movie
 *        ['true', 'false']
 * @return {Array<Movie>} 200 - success response
 * 
 */ 
router.get("/movies",validationMiddleware(movieSchema.getMoviesWithQueries, "query"), controllerWrapper(moviesController.getMovies) ); 

/** POST /api/auth/login
 * @summary Login a user
 * @param {User} request.body.required - user info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post("/auth/login",validationMiddleware(userSchema.signInSchema, "body"), controllerWrapper(authController.loginUser) );

/**
 * POST /api/auth/register
 * @summary Register a user
 * @param {User} request.body.required - user info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post("/auth/register",validationMiddleware(userSchema.registerSchema, "body"), controllerWrapper(authController.registerUser) );

/**
 * POST /api/review
 * @summary Create a review
 * @param {Review} request.body.required - review info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post("/review", verifyToken,validationMiddleware(reviewSchema.createReviewSchema, "body"), reviewsController.createReview );

/**
 * PATCH /api/review/:id
 * @summary Update a review
 * @param {integer} id.params.required - review id
 * @param {Review} request.body.required - review info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.patch("/review/:id", verifyToken,validationMiddleware(reviewSchema.updateReviewSchema, "body"), reviewsController.updateReview );

/** 
 * DELETE /api/review/:id
 * @summary Delete a review
 * @param {integer} id.params.required - review id
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
*/
router.delete("/review/:id", verifyToken, reviewsController.deleteReview );

/**
 * POST /api/rating
 * @summary Create a rating
 * @param {Rating} request.body.required - rating info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post ("/rating",verifyToken,validationMiddleware(ratingSchema.createRatingSchema, "body"), ratingsController.createRating );

/**
 * PATCH /api/rating/:id
 * @summary Update a rating
 * @param {integer} id.params.required - rating id
 * @param {Rating} request.body.required - rating info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.patch ("/rating/:id", verifyToken,validationMiddleware(ratingSchema.updateRatingSchema, "body"), ratingsController.updateRating);

/**
 * DELETE /api/rating/:id
 * @summary Delete a rating
 * @param {integer} id.params.required - rating id
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.delete ("/rating/:id", verifyToken, ratingsController.deleteRating);

export default router;