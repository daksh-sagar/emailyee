const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/authRoutes');
const billingRouter = require('./routes/billingRoutes');
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

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days,
    keys: [cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes middleware
app.use('/auth', authRouter);
app.use('/api', billingRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
