const router = require('express').Router();
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

router.get('/:id/:choice', (req, res) => {
  res.send('Thanks for your feedback');
});

router.post('/', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email })),
    _user: req.user.id,
    dateSent: Date.now()
  });

  //The place to send an email
  const mailer = new Mailer(survey, surveyTemplate(survey));
  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  } catch (e) {
    res.status(422).send(e);
  }
});

router.post('/webhooks', (req, res) => {
  _.chain(req.body)
    .map(event => {
      const pathname = new URL(event.url).pathname;
      const p = new Path('/api/surveys/:surveyId/:choice');
      const match = p.test(pathname);
      if (match) {
        return {
          email: match.email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(event => {
      Survey.updateOne(
        {
          _id: event.surveyId,
          recipients: {
            $elemMatch: { email: event.email, responded: false }
          }
        },
        {
          $inc: { [event.choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
      ).exec();
    })
    .value();

  res.send({});
});

module.exports = router;
