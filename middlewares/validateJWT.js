const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');

const validateToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    jwt.verify('token', process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) {
        next(ApiError.invalidToken('Invalid token'));
        return;
      }
      req.user = user;
      next();
    });
  } else {
    next(ApiError.unauthorized('You are not authenticated'));
    return;
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      next(ApiError.unauthorized('You are not allowed to do that'));
      return;
    }
  });
};

module.exports = { validateToken, verifyTokenAndAuthorization };
