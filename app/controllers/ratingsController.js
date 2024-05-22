import {Rating} from "../models/Rating.js";   // import the Rating model from the models folder
import {Media} from "../models/Media.js";   // import the Media model from the models folder  
import ratingSchema from "../validation/ratingSchemas.js";  // import the ratingSchema object from the validation folder    
import validateData from "../validation/validator.js";  // import the validateData file from the validation folder  

const ratingsController = {
  async getRatingById(req, res) {
    try {
      const rating = await Rating.findByPk(req.params.id);
      if (!rating) {
        return res.status(404).json({status: "fail", error: "Rating not found"});
      }
      return res.json({status: "success", data: rating});
    } catch (error) {
      console.error(error);
      return res.status(400).json({status: "fail", error: error.message});
    }
  },
  async createRating (req,res){
    try {
      let media;
      const userId = parseInt(req.userId);
      console.log(userId);
      const data = req.body; 
      const {parsedData, errors} = validateData(data, ratingSchema.createRatingSchema);
      if (errors) {
        return res.status(400).json({status:"fail", error: errors });
      }
      media = await Media.findOne({
        where: {
          tmdb_id: parsedData.tmdb_id
        }
      });
      if (!media){
        media = await Media.create({
          tmdb_id : parsedData.tmdb_id
        });
      }
      const rating = await Rating.create({
        value: parsedData.value,
        media_id: media.id,
        user_id: userId
      });
      res.json({status: "success", data : {rating_id:rating.id}});
      
    } catch (error ){
      console.error(error);
      return res.status(400).json({status: "fail", error: error.message});
    }   
  },
  
  async updateRating(req, res) {
    try {
      const userId = req.userId;
      const ratingId = parseInt(req.params.id);
      const ratingContent = req.body;
      const data = {userId,ratingId, ...ratingContent};
      const {parsedData, errors} = validateData(data, ratingSchema.updateRatingSchema);
      if (errors) {
        return res.status(400).json({status:"fail", error: errors});
      }
      const rating = await Rating.findOne({
        where: {
          id: ratingId,
          user_id: userId
        }
      });
      if (!rating) {
        return res.status(404).json({status:"fail", error: "Rating not found for this user"});
      }
      await rating.update({
        value: parsedData.value
      });
      return res.json({status:"success", data: true});      
    } catch (error) {
      console.error(error);
      return res.status(400).json({status: "fail", error: error.message});
    }
  },
  
  
  // async deleteRating(req, res) {
    
  // }
};











export default ratingsController;  // export the ratingsController object