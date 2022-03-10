const ApiError = require('../error/apiError');
const Cart = require('../models/Cart.model');

class cartController {
  async create(req, res, next) {
    const newCart = new Cart(req.body);
    try {
      await newCart.save();
      res.status(201).json({ newCart });
    } catch (error) {
      next(ApiError.internalError(`carts/${req.url}: ${error.message}`));
    }
  }

  async get(req, res, next) {
    try {
      // Get user cart
      const cart = await Cart.findOne({ userId: req.user.id }).exec();
      if (!cart) return next(ApiError.notFound('Cart not found'));

      res.status(200).json({ cart });
    } catch (error) {
      next(ApiError.internalError(`carts/${req.url}: ${error.message}`));
    }
  }

  async getAll(req, res, next) {
    try {
      const carts = await Cart.find();
      res.status(200).json({ carts });
    } catch (error) {
      next(ApiError.internalError(`carts/${req.url}: ${error.message}`));
    }
  }

  async update(req, res, next) {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).exec();
      res.status(200).json({ updatedCart });
    } catch (error) {
      next(ApiError.internalError(`carts/${req.url}: ${error.message}`));
    }
  }

  async delete(req, res, next) {
    try {
      await Cart.findByIdAndDelete(req.params.id).exec();
      res.sendStatus(200);
    } catch (error) {
      next(ApiError.internalError(`carts/${req.url}: ${error.message}`));
    }
  }
}

module.exports = new cartController();
