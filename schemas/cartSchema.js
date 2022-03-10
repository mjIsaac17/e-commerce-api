const yup = require('yup');
const mongoose = require('mongoose');

const createUpdateCartSchema = yup.object().shape({
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
    )
});

module.exports = {
  createUpdateCartSchema
};
