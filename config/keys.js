if (process.env.NODE_ENV === 'production') {
  //we are in production return prod set of keys
} else {
  //return dev keys
  module.exports = require('./dev');
}
