import {Rating} from "../models/Rating.js";
import {Media} from "../models/Media.js";
import ApiError from "../errors/ApiError.js";
import functionSqL from "../utils/functionSql.js";
import { fetchMovieTMDB } from "../services/axios.js";
import { LANGUAGE } from "./moviesController.js";
import { User } from "../models/User.js";

const ratingsController = {
  async createRating (req,res, next){
    let media;
    const userId = parseInt(req.userId); 
    const data = req.body; 
    media = await Media.findOne({
      where: {
        tmdb_id: data.tmdb_id
      }
    });
    if (!media){
      const movie = await fetchMovieTMDB(`/movie/${data.tmdb_id}`, { language: LANGUAGE });
      media = await Media.create({
        tmdb_id : data.tmdb_id,
        title_fr: movie?.title || "Unknown",
      });
    }
    const ratingAlreadyExist = await Rating.findOne({ where:{ media_id : media.id,
      user_id : userId}
    });
    if (ratingAlreadyExist) {
      return next(new ApiError(400, "Rating already exists for this user"));
    }     
    const rating = await Rating.create({
      value: data.value,
      media_id: media.id,
      user_id: userId
    });
    const result = await functionSqL.averageRating(rating.media_id);
    const newData = {...result, rating_id: rating.id, value: rating.value};
    res.json({status: "success", data : newData}); 
  },
  async updateRating(req, res,next) {
    const userId = parseInt(req.userId);
    const ratingId = parseInt(req.params.id);
    const ratingContent = req.body;
    const rating = await Rating.findOne({
      where: {
        id: ratingId,
        user_id: userId
      }
    });
    if (!rating) {
      return next(new ApiError(404, "Rating not found for this user"));  
    }
    await rating.update({
      value: ratingContent.value
    });
    const result = await functionSqL.averageRating(rating.media_id);
    return res.json({status:"success", data: {...result, rating_id: ratingId, value: ratingContent.value}});
  },
  async deleteRating(req, res,next ) {
    const ratingId = parseInt(req.params.id);
    const userId = req.userId;                    
    const rating = await Rating.findOne({
      where: {
        id: ratingId,
        user_id: userId
      }
    });
    if (!rating) {
      return next (new ApiError(404, "Rating not found for this user"));
    }
    await rating.destroy();
    return res.json({ status: "success", data: true });
  },
  async lastRatings(req, res) {
    const reviews = await Rating.findAll({
      order: [["created_at", "DESC"]],
      limit: 5,
      attributes: ["id", "value", "created_at"],
      include: [
        { model: Media, as: "media", attributes: ["id", "tmdb_id", "title_fr"] },
        { model: User, as: "user", attributes: ["id", "firstname"] },
      ],
    });
    res.json({ status: "success", data: reviews });
  },
};

export default ratingsController;