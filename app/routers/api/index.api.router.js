import express from 'express';
import moviesController from '../../controllers/moviesController.js'
import userController from '../../controllers/usersController.js';

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
 * GET /api/movie/:id
 * @summary get a movie
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.get('/movie/:id', moviesController.getMoviesById );
/**
 * POST /api/user
 * @summary Create a user
 * @param {User} request.body.required - user info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post('/user', userController.createUser );

export default router;