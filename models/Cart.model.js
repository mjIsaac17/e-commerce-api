const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        _id: false,
        productId: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, default: 1 }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
