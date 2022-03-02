const router = require('express').Router();
const validateSchema = require('../middlewares/validateRequest');
const authController = require('../controller/auth.controller');
const { registerSchema } = require('../schemas/authSchema');

router.get('/test', (req, res) => {
  res.send('Auth routes working');
});

// Register
// router.post(
//   '/register',
//   validateSchema(registerSchema),
//   authController.register
// );

// Login
router.post('/login', authController.login);

module.exports = router;
