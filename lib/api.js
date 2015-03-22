var restify = require('express-restify-mongoose');

var models = require('../models'),
    router = require('./router');

module.exports = function(req, res, next) {
  var app = req.app;

  // Auto-restify Mongoose models
  var apiOpts = {
    lowercase: true
  };
  restify.serve(router, models.Photo, apiOpts);
  restify.serve(router, models.User, apiOpts);

  next();
};