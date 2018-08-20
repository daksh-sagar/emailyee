const express = require('express');
const mongoose = require('mongoose');
require('./services/passport');
const authRouter = require('./routes/authRoutes');
const mongoURI = require('./config/keys').mongoURI;
require('./models/User');

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to the remote db'))
  .catch(error => console.log(error));

const app = express();

//Routes middleware
app.use('/auth/google', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
