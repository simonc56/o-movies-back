import express from "express";
import playlistController from "../../controllers/playlistController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import controllerWrapper from "../../middlewares/controllerWrapper.js";
import validationMiddleware from "../../middlewares/validationMiddleware.js";
import genericSchema from "../../validation/genericSchemas.js";
import playlistSchema from "../../validation/playlistSchemas.js";

const router = express.Router();

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
 * GET /api/playlist
 * @summary Get playlists
 * @tags Playlist
 * @return {Array<Playlist>} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 *
 */
router.get("", verifyToken, controllerWrapper(playlistController.getPlaylists));

/**
 * POST /api/playlist
 * @summary Create a playlist
 * @tags Playlist
 * @param {CreatePlaylist} request.body.required - playlist info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post(
  "",
  verifyToken,
  validationMiddleware({ body: playlistSchema.playlistSchema }),
  controllerWrapper(playlistController.createPlaylist)
);

/**
 * GET /api/playlist/:id
 * @summary Get a playlist
 * @tags Playlist
 * @param {string} id.params.required - playlist id
 * @return {array<Movie>} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.get(
  "/:id",
  verifyToken,
  validationMiddleware({ params: genericSchema.paramsId }),
  controllerWrapper(playlistController.getPlaylistById)
);

/**
 * PATCH /api/playlist/:id
 * @summary Update a playlist
 * @tags Playlist
 * @param {string} id.params.required - playlist id
 * @param {CreatePlaylist} request.body.required - playlist info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.patch(
  "/:id",
  verifyToken,
  validationMiddleware({ body: playlistSchema.playlistSchema, params: genericSchema.paramsId }),
  controllerWrapper(playlistController.updatePlaylist)
);

/**
 * DELETE /api/playlist/:id
 * @summary Delete a playlist
 * @tags Playlist
 * @param {string} id.params.required - playlist id
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.delete(
  "/:id",
  verifyToken,
  validationMiddleware({ params: genericSchema.paramsId }),
  controllerWrapper(playlistController.deletePlaylist)
);

/**
 * POST /api/playlist/:id/addmovie
 * @summary Add a movie in a playlist
 * @tags Playlist
 * @param {string} id.params.required - playlist id
 * @param {AddOrDeleteMovie} request.body.required - playlist info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.post(
  "/:id/addmovie",
  verifyToken,
  validationMiddleware({ body: playlistSchema.movieSchema, params: genericSchema.paramsId }),
  controllerWrapper(playlistController.addMovieInPlaylist)
);

/**
 * DELETE /api/playlist/:id/deletemovie
 * @summary Delete a movie in a playlist
 * @tags Playlist
 * @param {string} id.params.required - playlist id
 * @param {AddOrDeleteMovie} request.body.required - playlist info
 * @return {ApiSuccess} 200 - success response
 * @return {ApiError} 400 - bad input response
 * @return {ApiError} 500 - internal server error response
 */
router.delete(
  "/:id/deletemovie/:tmdb_id",
  verifyToken,
  validationMiddleware({ params: genericSchema.paramsId }),
  controllerWrapper(playlistController.deleteMovieInPlaylist)
);

export default router;
