const yup = require('yup');

const createProductSchema = yup.object().shape({
  title: yup.string().required(),
  desc: yup.string().required(),
  img: yup.string().required(),
  categories: yup.array().notRequired(),
  size: yup.array().notRequired(),
  color: yup.array().notRequired(),
  price: yup.number().required(),
  inStock: yup.boolean().notRequired()
});

const updateProductSchema = yup.object().shape({
  title: yup.string().notRequired(),
  desc: yup.string().notRequired(),
  img: yup.string().notRequired(),
  categories: yup.array().notRequired(),
  size: yup.array().notRequired(),
  color: yup.array().notRequired(),
  price: yup.number().notRequired(),
  inStock: yup.boolean().notRequired()
});

module.exports = {
  createProductSchema,
  updateProductSchema
};
