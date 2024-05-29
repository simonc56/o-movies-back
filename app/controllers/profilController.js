import {User, Review, Rating} from "../models/associations.js";

const profilController = {
  async getProfil(req, res){
    const userId = req.userId;
    const userData = await User.findOne({ attributes: {exclude: ["password", "role_id"]}, where: { id: userId } });
    console.log(userData);
    const countReview = await Review.count({ where: { user_id: userId } });
    const countRating = await Rating.count({ where: { user_id: userId } });
    const data = {
      ...userData.dataValues,
      count_review: countReview,
      count_rating: countRating
    };
    return res.json({ status: "success", data: data });
  },
};

export default profilController;