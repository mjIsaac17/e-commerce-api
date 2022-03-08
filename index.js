const express = require('express');
const moongose = require('mongoose');
const dotenv = require('dotenv');

const ApiError = require('./error/apiError');
const app = express();

dotenv.config();

// DB connection
moongose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB Connection Successfull');
  })
  .catch((error) => console.log(error));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/product.routes'));

// 404 - Invalid route
app.use('/', (req, res, next) => {
  next(ApiError.notFound('Route not found'));
});

// Error handler
app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({ error: error.message });
});

// Run application
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
