import { Review } from "../models/Review.js";
import { Media } from "../models/Media.js";
import ApiError from "../errors/ApiError.js";

const reviewsController = {
  async createReview(req, res, next) {
    let media;
    const userId = req.userId;
  
    const data = req.body;  
    media = await Media.findOne({
      where: {
        tmdb_id: data.tmdb_id
      }
    });            
    if (!media) {
      media = await Media.create({
        tmdb_id: data.tmdb_id,
      });
    }
    const reviewAlreadyExist = await Review.findOne({ where: { media_id: media.id, user_id: userId } });
    if (reviewAlreadyExist) { 
      return next(new ApiError(400, "Review already exists for this user"));
    }
    const review = await Review.create({
      content: data.content,
      media_id: media.id,
      user_id: userId
    });
    res.json({ status: "success", data: { review_id: review.id , content: review.content } });
  },
  async updateReview(req, res,next) {
    const userId = parseInt(req.userId);
    const reviewId = parseInt(req.params.id);
    const reviewContent = req.body;
    const review = await Review.findOne({ 
      where: {
        id: reviewId,
        user_id: userId
      }
    });
    if (!review) {
      return next (new ApiError(404, "Review not found for this user"));
    }
    await review.update({
      content: reviewContent.content             
    });
    return res.json({ status: "success", data: {content : review.content} });
  },
  async deleteReview(req, res,next) {
    const reviewId = parseInt(req.params.id);
    const userId = req.userId;                    
    const review = await Review.findOne({
      where: {
        id: reviewId,
        user_id: userId
      }
    });
    if (!review) {
      return next(new ApiError(404, "Review not found for this user"));
    }
    await review.destroy();
    return res.json({ status: "success", data: true });
  },
};

export default reviewsController;