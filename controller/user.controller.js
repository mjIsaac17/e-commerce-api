const CryptoJS = require('crypto-js');
const ApiError = require('../error/apiError');
const User = require('../models/User.model');

class userController {
  async update(req, res, next) {
    //Encrypt new user password
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).exec();
      res.status(200).json({ updatedUser });
    } catch (error) {
      next(ApiError.internalError(error));
    }
  }
}

module.exports = new userController();
