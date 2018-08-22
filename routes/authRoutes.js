const passport = require('passport');
const router = require('express').Router();

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/callback', passport.authenticate('google'));

router.get('/logout', (req, res) => {
  req.logout();
});

module.exports = router;
