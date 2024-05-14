import express from 'express';
import moviesController from '../../controllers/moviesController.js'

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
 * GET /api/posts
 * @summary get a movie
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.get('/movie/:id', moviesController.getMoviesById );

export default router;