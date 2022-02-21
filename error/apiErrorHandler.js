const ApiError = require('./apiError');

const apiErrorHandler = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ error: error.message });
  }

  return res.status(500).json({ error: 'Something went wrong' });
};

module.exports = apiErrorHandler;
