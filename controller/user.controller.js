const CryptoJS = require('crypto-js');
const ApiError = require('../error/apiError');
const User = require('../models/User.model');

class userController {
  async get(req, res, next) {
    try {
      const user = await User.findById(req.params.id, { password: 0 }).exec();
      if (!user) return next(ApiError.notFound('User not found'));

      res.status(200).json({ user });
    } catch (error) {
      next(ApiError.internalError(`users/${req.url}: ${error.message}`));
    }
  }

  async getAll(req, res, next) {
    try {
      // Get all user data but password
      const users = await User.find({}, { password: 0 }).exec();
      res.status(200).json({ users });
    } catch (error) {
      next(ApiError.internalError(`users/${req.url}: ${error.message}`));
    }
  }

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
      next(ApiError.internalError(`users/${req.url}: ${error.message}`));
    }
  }

  async delete(req, res, next) {
    try {
      await User.findByIdAndDelete(req.params.id).exec();
      res.sendStatus(200);
    } catch (error) {
      next(ApiError.internalError(`users/${req.url}: ${error.message}`));
    }
  }

  async stats(req, res, next) {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
      //Get total users per month since last year
      const stats = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        { $project: { month: { $month: '$createdAt' } } },
        { $group: { _id: '$month', total: { $sum: 1 } } }
      ]);
      res.status(200).json({ stats });
    } catch (error) {
      next(ApiError.internalError(`users/${req.url}: ${error.message}`));
    }
  }
}

module.exports = new userController();
