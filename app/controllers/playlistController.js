import { Playlist } from "../models/Playlist.js";
import { Media } from "../models/Media.js";
import { PlaylistHasMedia } from "../models/PlaylistHasMedia.js";
import ApiError from "../errors/ApiError.js";
import { fetchMovieTMDB } from "../services/axios.js";

const IMAGE_BASEURL = "https://image.tmdb.org/t/p";

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
  async addMovieInPlayist(req, res, next) {
    const tmdbId = req.body.tmdb_id;
    const playlistId = parseInt(req.params.id);
    const userId = req.userId;
    let media = await Media.findOne({ where: { tmdb_id: tmdbId } });
    if (!media) {
      media = await Media.create({
        tmdb_id: tmdbId,
      });
    }
    const notThisUserPlaylist = await Playlist.findOne({ where: { id: playlistId, user_id: userId  } });
    if (!notThisUserPlaylist) {
      return next(new ApiError(404, "Playlist not found for this user"));
    }
    const mediaAlreadyExist = await PlaylistHasMedia.findOne({ 
      where: { 
        playlist_id: playlistId,
        media_id: media.id
      } 
    });
    if (mediaAlreadyExist) { 
      return next(new ApiError(400, "Media already exists in this playlist"));
    } 
    await PlaylistHasMedia.create({
      playlist_id: playlistId,
      media_id: media.id
    });
    return res.json({ status: "success", data: true });
  },
  async deleteMovieInPlaylist(req, res, next) {
    const tmdbId = req.body.tmdb_id;
    const playlistId = parseInt(req.params.id);
    const userId = req.userId;
    const media = await Media.findOne({ where: { tmdb_id: tmdbId } });
    if (!media) {
      return next(new ApiError(404, "Media not found"));
    }
    const notThisUserPlaylist = await Playlist.findOne({ where: { id: playlistId, user_id: userId  } });
    if (!notThisUserPlaylist) {
      return next(new ApiError(404, "Playlist not found for this user"));
    }
    const mediaInPlaylist = await PlaylistHasMedia.findOne({ 
      where: { 
        playlist_id: playlistId,
        media_id: media.id
      } 
    });
    if (!mediaInPlaylist) {
      return next(new ApiError(404, "Media not found in this playlist"));
    }
    await mediaInPlaylist.destroy();
    return res.json({ status: "success", data: true });
  },
  async getPlaylists (req,res){  
    const userId = req.userId;
    const playlists = await Playlist.findAll({
      where: {
        user_id: userId
      }
    });
    res.json({ status: "success", data: playlists });
  },
  async getPlaylistById (req,res,next ){
    const playlistId = parseInt(req.params.id); 
    const userId = req.userId;
    const playlist = await Playlist.findOne({
      where: {
        id: playlistId,
        user_id: userId
      },
      include: "medias"
    });
    if (!playlist) {
      return next(new ApiError(404, "Playlist not found for this user"));
    }
    // Fetch the details of each media in the playlist
    // We use Promise.all to wait for all the requests to finish
    const mediaDetails = await Promise.all(
      playlist.medias.map(async (media) => {
        const fetchedMedia = await fetchMovieTMDB(`/movie/${media.tmdb_id}?language=fr-FR`);
        return {
          media_id: media.id,
          tmdb_id: media.tmdb_id,
          title: fetchedMedia.original_title,
          poster_path: `${IMAGE_BASEURL}/w300_and_h450_bestv2/${fetchedMedia.poster_path}`,
          release_date: fetchedMedia.release_date
        };
      })
    );
    // Construct the response data
    const data = {
      playlist_id: playlist.id,
      name: playlist.name,
      medias: mediaDetails
    };
    res.json({ status: "success", data: data });
  }  
};

export default playlistController;