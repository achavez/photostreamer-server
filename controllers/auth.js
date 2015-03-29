var passwordless = require('passwordless'),
    models = require('../models');

// Login form
exports.login = function(req, res, next) {
  res.render('login.hbs');
};

// Logout handler
exports.logout = [
  passwordless.logout(),
  function(req, res) {
    res.redirect('/');
  }
];

// POST route that causes passwordless to send the token
exports.sendtoken = function(req, res, next) {
  passwordless.requestToken(function(user, delivery, cb) {
    models.User.findOne({email: user}, function(err, user) {
      if(err) return cb(err, null);

      if(user) {
        cb(null, user.id);
        res.render('login.hbs', {
          success: true
        });
      }
      else {
        res.render('login.hbs', {
          err: true
        });
      }
    });
  })(req, res, next);
};