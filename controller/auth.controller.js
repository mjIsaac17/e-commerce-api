const User = require('../models/User.model');

class AuthController {
  register(req, res) {
    const newUser = new User({ ...req.body });
    console.log({ newUser });
    res.status(200).json();
  }
}

module.exports = new AuthController();
