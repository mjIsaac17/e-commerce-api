const ApiError = require('../error/apiError');
const Order = require('../models/Order.model');

class orderController {
  async create(req, res, next) {
    const newOrder = new Order(req.body);
    try {
      await newOrder.save();
      res.status(201).json({ newOrder });
    } catch (error) {
      next(ApiError.internalError(`orders/${req.url}: ${error.message}`));
    }
  }

  async get(req, res, next) {
    try {
      // Get user orders
      const orders = await Order.find({ userId: req.user.id }).exec();
      if (!orders) return next(ApiError.notFound('Orders not found'));

      res.status(200).json({ orders });
    } catch (error) {
      next(ApiError.internalError(`orders/${req.url}: ${error.message}`));
    }
  }

  async getAll(req, res, next) {
    try {
      const orders = await Order.find();
      res.status(200).json({ orders });
    } catch (error) {
      next(ApiError.internalError(`orders/${req.url}: ${error.message}`));
    }
  }

  async update(req, res, next) {
    try {
      const updatedCart = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).exec();
      res.status(200).json({ updatedCart });
    } catch (error) {
      next(ApiError.internalError(`orders/${req.url}: ${error.message}`));
    }
  }

  async delete(req, res, next) {
    try {
      await Order.findByIdAndDelete(req.params.id).exec();
      res.sendStatus(200);
    } catch (error) {
      next(ApiError.internalError(`orders/${req.url}: ${error.message}`));
    }
  }

  // Get monthly income
  async income(req, res, next) {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth - 1));
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: '$createdAt' },
            sales: '$amount'
          }
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' }
          }
        }
      ]);
      res.status(200).json({ income });
    } catch (error) {
      next(ApiError.internalError(`orders/${req.url}: ${error.message}`));
    }
  }
}

module.exports = new orderController();
