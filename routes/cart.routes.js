const cartController = require('../controller/cart.controller');
const {
  verifyToken,
  verifyUser,
  verifyIsAdmin
} = require('../middlewares/validateJWT');
const {
  validateSchema,
  verifyIsMongoId
} = require('../middlewares/validateRequest');
const { createUpdateCartSchema } = require('../schemas/cartSchema');

const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('Cart routes working');
});

// URL/carts
router.use(verifyToken);
router.get('/', verifyIsAdmin, cartController.getAll);
router.post('/', validateSchema(createUpdateCartSchema), cartController.create);

// id = userId, this is to get the user cart.
router.get('/:id', [verifyUser, verifyIsMongoId], cartController.get);

// id = cartId
router.put(
  '/:id',
  [verifyIsMongoId, validateSchema(createUpdateCartSchema)],
  cartController.update
);
router.delete('/:id', verifyIsMongoId, cartController.delete);

module.exports = router;
