const yup = require('yup');
const mongoose = require('mongoose');

const createUpdateOrderSchema = yup.object().shape({
  userId: yup.string().required(),
  products: yup
    .array()
    .notRequired()
    .of(
      yup.object().shape({
        productId: yup
          .string()
          .required()
          .test('is-valid-id', 'Invalid product id', (id) =>
            mongoose.isValidObjectId(id)
          ),
        quantity: yup.number().notRequired()
      })
    ),
  amount: yup.number().required(),
  address: yup.string().required(),
  status: yup.string().notRequired()
});

module.exports = {
  createUpdateOrderSchema
};
