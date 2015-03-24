var passwordless = require('passwordless'),
    models = require('../models');

// Login form
exports.login = function(req, res, next) {
  res.render('login.hbs');
};

// Routes based on whether the user was found in the system
exports.found = function(req, res, next) {
  res.render('login.hbs', {
    msg: 'Found.'
  });
};
exports.notfound = function(req, res, next) {
  res.render('login.hbs', {
    msg: 'Not found.'
  });
};

// POST route that causes passwordless to send the token
exports.sendtoken = function(req, res, next) {
  passwordless.requestToken(function(user, delivery, cb) {
    models.User.findOne({email: user}, function(err, user) {
      if(err) return cb(err, null);

      if(user) {
        cb(null, user.id);
        res.redirect('/login/found');
      }
      else {
        res.redirect('/login/notfound');
      }
    });
  })(req, res, next);
};