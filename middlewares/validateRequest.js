const ApiError = require('../error/apiError');

const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(ApiError.badRequest(error));
  }
};

module.exports = validateSchema;
