var models = require('../models');

/*
 * Add user data to req.locals
 */
module.exports = function(req, res, next) {

  if(req.hasOwnProperty('user')) {
    models.User.findById(req.user, 'name email', function(err, user) {
      if(err) return next(err);
      res.locals.user = user;
      next();
    });
  }
  else {
    next();
  }

};