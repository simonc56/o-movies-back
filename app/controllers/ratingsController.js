import {Rating} from "../models/Rating.js";   // import the Rating model from the models folder
import {Media} from "../models/Media.js";   // import the Media model from the models folder  

const ratingsController = {
  async createRating (req,res){
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
      return res.status(400).json({status:"fail", error: "this user already rated this movie" });
    }     
    const rating = await Rating.create({
      value: data.value,
      media_id: media.id,
      user_id: userId
    });
    res.json({status: "success", data : {ratingId:rating.id}}); 
 
  },
  
  async updateRating(req, res) {
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
      return res.status(404).json({status:"fail", error: "Rating not found for this user"});
    }
    await rating.update({
      value: data.value
    });
    return res.json({status:"success", data: true});      

  },
  
  async deleteRating(req, res) {
    const ratingId = parseInt(req.params.id);
    const userId = req.userId;                    
    const rating = await Rating.findOne({
      where: {
        id: ratingId,
        user_id: userId
      }
    });
    if (!rating) {
      return res.status(404).json({ status :"fail", error: "Rating not found for this user" });
    }
    await rating.destroy();
    return res.json({ status: "success", data: true });
  },
};

export default ratingsController;  // export the ratingsController object