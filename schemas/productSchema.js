const yup = require('yup');

const createProductSchema = yup.object().shape({
  title: yup.string().required(),
  desc: yup.string().required(),
  img: yup.string().required(),
  categories: yup.array().notRequired(),
  size: yup.string().notRequired(),
  color: yup.string().notRequired(),
  price: yup.number().required()
});

const updateProductSchema = yup.object().shape({
  title: yup.string().notRequired(),
  desc: yup.string().notRequired(),
  img: yup.string().notRequired(),
  categories: yup.array().notRequired(),
  size: yup.string().notRequired(),
  color: yup.string().notRequired(),
  price: yup.number().notRequired()
});

module.exports = {
  createProductSchema,
  updateProductSchema
};
