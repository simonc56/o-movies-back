import { Media } from "../models/Media.js";
import { View } from "../models/View.js";
import ApiError from "../errors/ApiError.js";

const viewsController = {
  async createMediaAsViewed(req, res, next) {
    const userId = req.userId;
    const data = req.body;
    let media = await Media.findOne({
      where: {
        tmdb_id: data.tmdb_id
      }
    });
    if (!media) {
      media = await Media.create({
        tmdb_id: data.tmdb_id
      });
    }
    const viewAlreadyExists = await View.findOne({
      where: {
        media_id: media.id,
        user_id: userId
      }
    });
    if (viewAlreadyExists) {
      return next(new ApiError(400, "Media already marked as viewed by this user"));
    }
    const userMediaView = await View.create({
      user_id: userId,
      media_id:media.id
    });
    res.json({ status: "success", data: { userMediaViewId: userMediaView.id } });
  },
  async deleteMediaAsViewed(req, res, next) {
    const userId = req.userId;
    const tmdbId = req.params.id;
    let media = await Media.findOne({
      where: {
        tmdb_id: tmdbId
      }
    });
    if (!media) {
      return next(new ApiError(400, "Media not found"));
    }
    const userMediaView = await View.findOne({
      where: {
        user_id: userId,
        media_id: media.id, 
      }
    });
    if (!userMediaView) {
      return next(new ApiError(400, "Media not marked as viewed by this user"));
    }
    await userMediaView.destroy();
    res.json({ status: "success", data: true });
  }
};
  
export default viewsController;