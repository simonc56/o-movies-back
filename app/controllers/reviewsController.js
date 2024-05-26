import { Review } from "../models/Review.js";   // import the Review model from the models folder
import { Media } from "../models/Media.js";   // import the Media model from the models folder


const reviewsController = {
  async createReview(req, res) {
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
    const review = await Review.create({
      content: data.content,
      media_id: media.id,
      user_id: userId
    });
    res.json({ status: "success", data: { reviewId: review.id } });
  },
  // reviewid et le content à renvoyer dans le body 
  async updateReview(req, res) {
    const userId = req.userId;
    const reviewId = parseInt(req.params.id);
    const reviewContent = req.body;
    const data = {userId , reviewId, ...reviewContent};
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
      content: data.content             
    });
    return res.json({ status: "success", data: true });
  },
  async deleteReview(req, res) {
    const reviewId = parseInt(req.params.id);
    const userId = req.userId;                    
    const review = await Review.findOne({
      where: {
        id: reviewId,
        user_id: userId
      }
    });
    if (!review) {
      return res.status(404).json({ status :"fail", error: "Review not found for this user" });
    }
    await review.destroy();
    return res.json({ status: "success", data: true });
  },
};

export default reviewsController;  // export the reviewsController object