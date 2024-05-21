import { Review } from "../models/Review.js";   // import the Review model from the models folder
import { Media } from "../models/Media.js";   // import the Media model from the models folder
import reviewSchema from "../validation/reviewSchemas.js";  // import the reviewSchema object from the validation folder
import validateData from "../validation/validator.js";  // import the validateData file from the validation folder

const reviewsController = {
    
  async getReviewById(req, res) {
    try {
      const review = await Review.findByPk(req.params.id);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }
      return res.json({ status: "success", data: true });
    } catch (error) {
      console.error(error);
      return res.status(400).json({status :"fail", error: error.message });
    }
  },
  async createReview(req, res) {
    try {
      let media;
      const userId = req.userId;
      const data = req.body;  
      const { parsedData, errors } = validateData(data, reviewSchema.createReviewSchema);
      if (errors) {
        return res.status(400).json({status: "fail", error: errors });
      }           
      media = await Media.findOne({
        where: {
          tmdb_id: parsedData.tmdb_id
        }
      });            
      if (!media) {
        media = await Media.create({
          tmdb_id: parsedData.tmdb_id,
        });
      }
      const review = await Review.create({
        content: parsedData.content,
        media_id: media.id,
        user_id: userId
      });
      res.json({ status: "success", data: { review_id: review.id } });
    } catch (error) {
      console.error(error);
      return res.status(400).json({status :"fail",  error: error.message });
    }
  },
  // reviewid et le content à renvoyer dans le body 
  async updateReview(req, res) {
    try {
      const userId = req.userId;
      const reviewId = parseInt(req.params.id);
      const reviewContent = req.body;
      const data = {userId , reviewId, ...reviewContent};
      const { parsedData, errors } = validateData(data, reviewSchema.updateReviewSchema);
      if (errors) {
        return res.status(400).json({status: "fail",  error: errors });
      }
      const review = await Review.findOne({ 
        where: {
          id: reviewId,
          user_id: userId
        }
      });
      if (!review) {
        return res.status(404).json({status: "fail", error: "Review not found for this user " });
      }
      await review.update({
        content: parsedData.content             
      });
      return res.json({ status: "success", data: true });
    } catch (error) {
      console.error(error);
      return res.status(400).json({status :"fail", error: error.message });
    }
  },
  async deleteReview(req, res) {
    try {
      const userId = req.userId;                    
      const review = await Review.findOne({
        where: {
          id: req.params.id,
          user_id: userId
        }
      });
      if (!review) {
        return res.status(404).json({ status :"fail", error: "Review not found for this user" });
      }
      await review.destroy();
      return res.json({ status: "success", data: true });
    } catch (error) {
      console.error(error);
      return res.status(400).json({status :"fail", error: error.message });
    }
  },
};

export default reviewsController;  // export the reviewsController object