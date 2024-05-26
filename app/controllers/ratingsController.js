import {Rating} from "../models/Rating.js";   // import the Rating model from the models folder
import {Media} from "../models/Media.js";   // import the Media model from the models folder  
import ApiError from "../errors/ApiError.js"; // import the ApiError class from the utils folder

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
      media = await Media.create({
        tmdb_id : data.tmdb_id
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
    res.json({status: "success", data : {ratingId:rating.id}}); 
  },
  async updateRating(req, res,next) {
    const userId = req.userId;
    const ratingId = parseInt(req.params.id);
    const ratingContent = req.body;
    const data = {userId,ratingId, ...ratingContent};
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
      value: data.value
    });
    return res.json({status:"success", data: true});      
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
};

export default ratingsController;  // export the ratingsController object