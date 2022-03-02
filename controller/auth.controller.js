const CryptoJS = require('crypto-js');
const ApiError = require('../error/apiError');
const User = require('../models/User.model');

class AuthController {
  async register(req, res, next) {
    try {
      const newUser = new User({
        ...req.body,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString()
      });
      await newUser.save();
      res.status(201).json({ newUser });
    } catch (error) {
      next(ApiError.internalError(error));
    }
  }
}

module.exports = new AuthController();
