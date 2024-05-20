import express from 'express';
import moviesController from '../../controllers/moviesController.js';
import authController from '../../controllers/authController.js';

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
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.get('/movie/:id', moviesController.getMoviesById );

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
router.get('/movies', moviesController.getMovies ); 

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

export default router;