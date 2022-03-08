const CryptoJS = require('crypto-js');
const ApiError = require('../error/apiError');
const Product = require('../models/Product.model');

class productController {
  async create(req, res, next) {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(201).json({ newProduct });
    } catch (error) {
      next(ApiError.internalError(`products/${req.url}: ${error.message}`));
    }
  }

  async get(req, res, next) {
    try {
      const product = await Product.findById(req.params.id).exec();
      if (!product) return next(ApiError.notFound('Product not found'));

      res.status(200).json({ product });
    } catch (error) {
      next(ApiError.internalError(`products/${req.url}: ${error.message}`));
    }
  }

  async getAll(req, res, next) {
    try {
      const qNew = req.query.new;
      const qCategory = req.query.category;
      const qLimit = req.query.limit || 20;

      let products;
      if (qNew) {
        // Get newest products
        products = await Product.find()
          .sort({ createdAt: -1 })
          .limit(qLimit)
          .exec();
      } else if (qCategory) {
        // Get products by category
        products = await Product.find({
          categories: { $in: [qCategory] }
        })
          .limit(qLimit)
          .exec();
      } else {
        // Get all product data
        products = await Product.find().limit(qLimit).exec();
      }

      res.status(200).json({ products });
    } catch (error) {
      next(ApiError.internalError(`products/${req.url}: ${error.message}`));
    }
  }

  async update(req, res, next) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).exec();
      res.status(200).json({ updatedProduct });
    } catch (error) {
      next(ApiError.internalError(`products/${req.url}: ${error.message}`));
    }
  }

  async delete(req, res, next) {
    try {
      await Product.findByIdAndDelete(req.params.id).exec();
      res.sendStatus(200);
    } catch (error) {
      next(ApiError.internalError(`products/${req.url}: ${error.message}`));
    }
  }

  async stats(req, res, next) {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
      //Get total products per month since last year
      const stats = await Product.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        { $project: { month: { $month: '$createdAt' } } },
        { $group: { _id: '$month', total: { $sum: 1 } } }
      ]);
      res.status(200).json({ stats });
    } catch (error) {
      next(ApiError.internalError(`products/${req.url}: ${error.message}`));
    }
  }
}

module.exports = new productController();
