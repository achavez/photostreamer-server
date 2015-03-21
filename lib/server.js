var app = require('express')();

// Use backbone.io to sync Mongoose models with clients
var http = require('http'),
    server = http.createServer(app),
    backboneio = require('backbone.io'),
    backend = backboneio.createBackend();

// Connect our Backbone.io instance to defined models
var models = require('../models')
backend.use(backboneio.middleware.mongooseStore(models.Photo));

// Setup Socket.io
var io = backboneio.listen(server, {
  photos: backend
});

// Fire up the app and listen for incoming requests
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
  console.log("Listening on port " + port);
});

module.exports = {
  io: io,
  backend: backend,
  app: app
}
