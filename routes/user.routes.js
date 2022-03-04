const userController = require('../controller/user.controller');
const { verifyAuth, verifyToken } = require('../middlewares/validateJWT');

const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('User routes working');
});

router.put('/:id', [verifyToken, verifyAuth], userController.update);

module.exports = router;
