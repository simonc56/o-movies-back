import { Playlist } from "../models/Playlist.js";
import ApiError from "../errors/ApiError.js";

const playlistController = {
  async createPlaylist(req, res, next) {
    const userId = req.userId;
    const data = req.body;
    const countPlaylist = await Playlist.count({
      where: {
        user_id: userId
      }
    });
    if (countPlaylist >= 10) {
      return next(new ApiError(400, "You can't create more than 10 playlists"));
    }
    const playlist = await Playlist.create({
      name: data.name,
      user_id: userId
    });
    res.json({ status: "success", data: { playlist_id: playlist.id } });
  },
  async updatePlaylist(req, res, next) {
    const userId = parseInt(req.userId);
    const playlistId = parseInt(req.params.id);
    const playlistName = req.body;
    const playlist = await Playlist.findOne({
      where: {
        id: playlistId,
        user_id: userId
      }
    });
    if (!playlist) {
      return next(new ApiError(404, "Playlist not found for this user"));
    }
    await playlist.update({
      name: playlistName.name
    });
    return res.json({ status: "success", data: true });
  },
  async deletePlaylist(req, res, next) {
    const playlistId = parseInt(req.params.id);
    const userId = req.userId;
    const playlist = await Playlist.findOne({
      where: {
        id: playlistId,
        user_id: userId
      }
    });
    if (!playlist) {
      return next(new ApiError(404, "Playlist not found or already delete for this user"));
    }
    await playlist.destroy();
    return res.json({ status: "success", data: true });
  },
};

export default playlistController;