import {User} from "../models/associations.js";

const profilController = {
  async getProfil(req, res){
    const userId = req.userId;
    const userData = await User.findOne({ attributes: {exclude: ["password", "role_id"]}, where: { id: userId } });

    return res.json({ status: "success", data: userData });
  },
};

export default profilController;