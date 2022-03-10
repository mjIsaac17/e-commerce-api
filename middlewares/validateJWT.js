const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) {
        return next(ApiError.invalidToken('Invalid token'));
      }
      req.user = user;
      next();
    });
  } else next(ApiError.invalidToken('You are not authenticated'));
};

// To call verifyUser is needed to call verifyToken first
const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) return next();

  next(ApiError.invalidToken('You are not allowed to do that'));
};

const verifyIsAdmin = (req, res, next) => {
  if (req.user.isAdmin) return next();

  next(ApiError.invalidToken('You are not allowed to do that'));
};

module.exports = { verifyToken, verifyUser, verifyIsAdmin };
