// Initialize express router
import express from "express";
import moviesRouter from "./movies.router.js";
import authRouter from "./auth.router.js";
import reviewsRouter from "./reviews.router.js";
import ratingsRouter from "./ratings.router.js";
import viewsRouter from "./views.router.js";
import profileRouter from "./profile.router.js";
import playlistsRouter from "./playlists.router.js";

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

router.use("/movie", moviesRouter);
router.use("/auth", authRouter);
router.use("/review", reviewsRouter);
router.use("/rating", ratingsRouter);
router.use("/view", viewsRouter);
router.use("/profil", profileRouter);
router.use("/playlist", playlistsRouter);

export default router;