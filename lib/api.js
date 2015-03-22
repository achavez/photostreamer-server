var restify = require('express-restify-mongoose');

var models = require('../models'),
    router = require('./router'),
    auth = require('../auth');

module.exports = function(req, res, next) {
  var app = req.app;

  // Auto-restify Mongoose models
  var apiOpts = {
    lowercase: true,
    middleware: auth.api
  };
  restify.serve(router, models.Photo, apiOpts);
  restify.serve(router, models.User, apiOpts);

  next();
};