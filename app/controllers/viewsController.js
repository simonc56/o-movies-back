import ApiError from "../errors/ApiError.js";
import { Media } from "../models/Media.js";
import { View } from "../models/View.js";
import { fetchTMDB } from "../services/axios.js";
import { LANGUAGE } from "./moviesController.js";

const viewsController = {
  async createMediaAsViewed(req, res, next) {
    const userId = req.userId;
    const data = req.body;
    let media = await Media.findOne({
      where: {
        tmdb_id: data.tmdb_id,
      },
    });
    if (!media) {
      const movie = await fetchTMDB(`/movie/${data.tmdb_id}`, { language: LANGUAGE });
      media = await Media.create({
        tmdb_id: data.tmdb_id,
        title_fr: movie?.title || "Unknown",
      });
    }
    const viewAlreadyExists = await View.findOne({
      where: {
        media_id: media.id,
        user_id: userId,
      },
    });
    if (viewAlreadyExists) {
      return next(new ApiError(400, "Media already marked as viewed by this user"));
    }
    const userMediaView = await View.create({
      user_id: userId,
      media_id: media.id,
    });
    res.json({ status: "success", data: { user_media_viewId: userMediaView.id } });
  },
  async deleteMediaAsViewed(req, res, next) {
    const userId = req.userId;
    const tmdbId = req.params.tmdb_id;
    let media = await Media.findOne({
      where: {
        tmdb_id: tmdbId,
      },
    });
    if (!media) {
      return next(new ApiError(400, "Media not found"));
    }
    const userMediaView = await View.findOne({
      where: {
        user_id: userId,
        media_id: media.id,
      },
    });
    if (!userMediaView) {
      return next(new ApiError(400, "Media not marked as viewed by this user"));
    }
    await userMediaView.destroy();
    res.json({ status: "success", data: true });
  },
};

export default viewsController;
