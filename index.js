const express = require('express');
const moongose = require('mongoose');
const dotenv = require('dotenv');
const { userRoutes } = require('./routes/user.routes');
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
app.use('/api/users', userRoutes);

// Run application
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
