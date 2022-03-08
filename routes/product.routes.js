const productController = require('../controller/product.controller');
const {
  validateSchema,
  verifyIsMongoId
} = require('../middlewares/validateRequest');
const { verifyIsAdmin, verifyToken } = require('../middlewares/validateJWT');
const {
  createProductSchema,
  updateProductSchema
} = require('../schemas/productSchema');

const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('Product routes working');
});

// URL/products
router.use(verifyToken);

// GET & GET ALL
router.get('/', productController.getAll);
router.get('/:id', verifyIsMongoId, productController.get);

// CREATE
router.use(verifyIsAdmin);
router.post('/', validateSchema(createProductSchema), productController.create);

// UPDATE & DELETE
router.put(
  '/:id',
  [verifyIsMongoId, validateSchema(updateProductSchema)],
  productController.update
);
router.delete('/:id', verifyIsMongoId, productController.delete);

module.exports = router;
