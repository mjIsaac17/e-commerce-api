const ApiError = require('../error/apiError');

const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.post('/payment', (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd'
    },
    (error, response) => {
      if (error) {
        next(ApiError.internalError(error));
      } else {
        res.status(200).json({ response });
      }
    }
  );
});

module.exports = router;
