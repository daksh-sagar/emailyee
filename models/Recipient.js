const { Schema } = require('mongoose');

const RecipientSchema = new Schema({
  responded: { type: Boolean, default: false },
  email: String
});

module.exports = RecipientSchema;
