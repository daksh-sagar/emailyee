const router = require('express').Router();
const { stripeSecretKey } = require('../config/keys');
const stripe = require('stripe')(stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

router.post('/stripe', requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '$5 for five surveys',
    source: req.body.id
  });
  console.log(charge);

  req.user.credits += 5;
  const user = await req.user.save();
  res.send(user);
});

module.exports = router;
