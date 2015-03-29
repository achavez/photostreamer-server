var User = require('../models').User,
    restify = require('express-restify-mongoose');

/*
 * Middleware for all API requests that looks for a token
 * in the header and validates it against the list of authorized
 * users, returning an error if it's invalid.
 */
module.exports = function(req, res, next) {
  // Skip header authorization for users with an active passwordless
  // session
  if(typeof req.user !== 'undefined') {
    return next();
  }

  var key = req.header('Authorization');

  if(typeof key === 'undefined') {
    return res.status(400).send('An API key is required.');
  }

  User.findByKey(key, function(err, user) {
    if(err) return next(err);

    if(user) {
      req.user = user.id;
      next();
    }
    else {
      res.status(401).send('Invalid API key.');
    }
  });
};