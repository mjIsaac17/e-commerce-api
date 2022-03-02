class ApiError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static internalError(message) {
    return new ApiError(500, message);
  }

  static unauthorized(message) {
    return new ApiError(401, message);
  }

  static invalidToken(message) {
    return new ApiError(403, message);
  }
}

module.exports = ApiError;
