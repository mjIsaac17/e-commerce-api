const yup = require('yup');

const registerSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  isAdmin: yup.boolean().notRequired()
});

module.exports = {
  registerSchema
};
