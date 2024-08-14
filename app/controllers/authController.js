import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.js";
import { User } from "../models/User.js";
import { generateTokens, hashToken, setCookies } from "../utils/auth.js";

const authController = {
  async registerUser(req, res, next) {
    // get data from request body
    const data = req.body;
    // check if the email already exists
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      return next(new ApiError(400, "Email already exists"));
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
      birthdate: data.birthdate,
    });
    // return the user
    return res.json({ status: "success", data: true });
  },

  async loginUser(req, res, next) {
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
    const { token, fingerprint, refresh } = generateTokens(user.id);
    // add cookies with the fingerprint and refresh token
    setCookies(req, res, fingerprint, refresh);
    // create the data user
    const dataUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: token,
    };
    // return the user
    return res.json({ status: "success", data: dataUser });
  },

  async refreshToken(req, res, next) {
    // token has not been checked in verifyToken middleware because it's probably expired
    const refresh = req.cookies["refresh"] || undefined;
    const JWTtoken = req.headers["authorization"]?.slice(7) || undefined;
    const decoded = (JWTtoken && jwt.decode(JWTtoken, process.env.TOKEN_SECRET)) || undefined;
    // check if the JWT token and the refresh cookie exist and are valid
    if (!refresh || !decoded || hashToken(refresh) !== decoded.refresh) {
      return next(new ApiError(401, "Refresh token not found or invalid, user has to login again"));
    }
    // req.userId is set in optionalToken middleware
    const { token: newToken, fingerprint, refresh: newRefresh } = generateTokens(req.userId);
    // update cookies with the fingerprint and refresh token
    setCookies(req, res, fingerprint, newRefresh);
    // return the new token
    return res.json({ status: "success", data: { token: newToken } });
  },

  async changePassword(req, res, next) {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.userId);

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return next(new ApiError(400, "Old password is incorrect"));
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res.json({ status: "success", data: true });
  },
};

export default authController;
