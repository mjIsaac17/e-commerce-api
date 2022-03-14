const orderController = require('../controller/order.controller');
const {
  verifyToken,
  verifyUser,
  verifyIsAdmin
} = require('../middlewares/validateJWT');
const {
  validateSchema,
  verifyIsMongoId
} = require('../middlewares/validateRequest');
const { createUpdateOrderSchema } = require('../schemas/orderSchema');

const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('Order routes working');
});

// URL/orders
// USER ROUTES
router.use(verifyToken);
router.post(
  '/',
  validateSchema(createUpdateOrderSchema),
  orderController.create
);

// id = userId, this is to get user oders.
router.get('/:id', [verifyUser, verifyIsMongoId], orderController.get);

// ADMIN ROUTES
router.use(verifyIsAdmin);
router.get('/', orderController.getAll);
router.get('/income', orderController.income);
// id = orderId
router.put(
  '/:id',
  [verifyIsMongoId, validateSchema(createUpdateOrderSchema)],
  orderController.update
);
// id = orderId
router.delete('/:id', verifyIsMongoId, orderController.delete);

module.exports = router;
