const userController = require('../controller/user.controller');
const {
  verifyUser,
  verifyToken,
  verifyIsAdmin
} = require('../middlewares/validateJWT');
const { verifyIsMongoId } = require('../middlewares/validateRequest');

const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('User routes working');
});

// URL/users/
// All routes require a valid token
router.use(verifyToken);
router.put('/:id', [verifyUser, verifyIsMongoId], userController.update);

router.use(verifyIsAdmin);
router.get('/', userController.getAll);
router.get('/stats', userController.stats);
router.get('/:id', verifyIsMongoId, userController.get);
router.delete('/:id', verifyIsMongoId, userController.delete);

module.exports = router;
