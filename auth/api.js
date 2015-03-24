var User = require('../models').User,
    restify = require('express-restify-mongoose');

/*
 * Middleware for all API requests that looks for a token
 * parameter and validates it against the list of authorized
 * users, returning an error if it's invalid.
 */
module.exports = function(req, res, next) {
  // TODO: Skip validation based on header if there's already a
  // user set meaning (meaning this is probably a Web request
  // that's already authed)

  var key = req.header('Authorization');

  if(typeof key === 'undefined') {
    return res.status(400).send('An API key is required.');
  }

  User.findByKey(key, function(err, user) {
    if(err) return next(err);

    if(user) {
      req.user = user;
      next();
    }
    else {
      res.status(401).send('Invalid API key.');
    }
  });
};