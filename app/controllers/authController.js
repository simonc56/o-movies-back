import { User } from "../models/User.js";   // import the User model from the models folder
import bcrypt from "bcrypt"; // import the bcrypt package 
import jwt from "jsonwebtoken"; // import the jsonwebtoken package
import ApiError from "../errors/ApiError.js"; // import the ApiError class from the utils folder

const authController = {
  async registerUser(req, res,next) {
    // get data from request body
    const data = req.body;
    // check if the email already exists 
    const existingUser = await User.findOne({where: {email: data.email},});        
    if (existingUser) {
      return next (new ApiError(400, "Email already exists"));
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);           
    // create the user
    await User.create({
      role_id: 2,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email, 
      password: hashedPassword, 
      birthdate: data.birthdate
    });            
    // return the user
    return res.json({ status: "success", data: true });
  },

  async loginUser(req, res,next) {
    // get data from request body
    const data = req.body;      
    // check if the email exists
    const user = await User.findOne({ where: { email: data.email } });           
    if (!user) {
      return next(new ApiError(400, "Account not found"));
    }           
    // check if the password is correct
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      return next(new ApiError(400, "Account not found"));
    }           
    // create a token
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);           
    // create the data user
    const dataUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: token
    };
      // return the user
    return res.json({ status: "success", data: dataUser });
  }
};

export default authController;