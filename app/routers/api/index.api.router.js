import express from 'express';
import moviesController from '../../controllers/moviesController.js';
import authController from '../../controllers/authController.js';
import reviewsController from '../../controllers/reviewsController.js';
import verifyToken from '../../middlewares/authMiddleware.js';

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
 * @property {string} id - The movie id
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

/**
 * GET /api/movie/:id
 * @summary get a movie
 * @param {integer} id.params.required - movie id
 * @return {Movie} 200 - success response
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.get('/movie/:id', moviesController.getMoviesById );


/** POST /api/auth/login
 * @summary Login a user
 * @param {User} request.body.required - user info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post('/auth/login', authController.loginUser );

/**
 * POST /api/auth/register
 * @summary Register a user
 * @param {User} request.body.required - user info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post('/auth/register', authController.registerUser );

/**
 * POST /api/review
 * @summary Create a review
 * @param {Review} request.body.required - review info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post('/review', verifyToken, reviewsController.createReview );

/**
 * PATCH /api/review/:id
 * @summary Update a review
 * @param {integer} id.params.required - review id
 * @param {Review} request.body.required - review info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.patch('/review/:id', verifyToken, reviewsController.updateReview );

/** 
 * DELETE /api/review/:id
 * @summary Delete a review
 * @param {integer} id.params.required - review id
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
*/
router.delete('/review/:id', verifyToken, reviewsController.deleteReview );

export default router;