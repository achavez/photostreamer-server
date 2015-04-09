var restify = require('express-restify-mongoose'),
    _ = require('underscore');

var models = require('../models'),
    router = require('./router'),
    auth = require('../auth');

module.exports = function(req, res, next) {
  // Auto-restify Mongoose models
  var apiOpts = {
    lowercase: true,
    middleware: auth.api
  };
  restify.serve(router, models.Photo, apiOpts);
  restify.serve(router, models.User, _.extend({
    outputFn: function(res, result, statusCode) {

      function addSelf(user) {
        if(user._id.toString() === res.locals.user._id.toString()) {
          user.self = true;
        }
        return user;
      }

      // Add a boolean indicating whether a user is the requesting
      // user, assuming the db return isn't null
      if(result !== null) {
        if(result.hasOwnProperty('_id')) {
          result = addSelf(result);
        }
        else {
          result.map(addSelf);
        }
      }

      res.send(statusCode || 200, result);
    }
  }, apiOpts));

  next();
};