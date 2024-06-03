import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import transporter from "../config/nodemailer.js";
import { Op } from "sequelize";
import ApiError from "../errors/ApiError.js";

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
      return next(new ApiError(401, "Account not found"));
    }           
    // check if the password is correct
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      return next(new ApiError(401, "Account not found"));
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
  },

  async requestPasswordReset(req, res, next) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(new ApiError(404, "Account not found"));
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiration;

    await user.save();

    const resetLink = `http://${req.headers.host}/reset/password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
            Please click on the following link, or paste this into your browser to complete the process:
            ${resetLink}
            If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return next(new ApiError(500, "Error sending email"));
      }
      return res.json({ status: "success", message: "Password reset email sent" });
    });
  },

  async resetPassword(req, res, next) {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return next(new ApiError(400, "Password reset token is invalid or has expired"));
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.json({ status: "success", message: "Password has been reset" });
  },
};

export default authController;