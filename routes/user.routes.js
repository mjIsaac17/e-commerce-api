const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('User routes working');
});

module.exports = { userRoutes: router };
