const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./models/User');
require('./services/passport');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/authRoutes');
const mongoURI = require('./config/keys').mongoURI;
const cookieKey = require('./config/keys').cookieKey;

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to the remote db'))
  .catch(error => console.log(error));

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days,
    keys: [cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes middleware
app.use('/auth/google', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
