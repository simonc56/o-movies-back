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

router.use("/movie", moviesRouter);
router.use("/auth", authRouter);
router.use("/review", reviewsRouter);
router.use("/rating", ratingsRouter);
router.use("/view", viewsRouter);
router.use("/profil", profileRouter);
router.use("/playlist", playlistsRouter);

export default router;