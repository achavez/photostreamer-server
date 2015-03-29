/*
 * This setup script is run after the first install. It creates
 * the first user account based on env variables provided during
 * the deployment.
 */
var mongoose = require('mongoose');

var models = require('../models'),
    config = require('./config');

mongoose.connect(config.dbUrl);

var user = new models.User({
  name: process.env.FIRST_USER_NAME,
  email: process.env.FIRST_USER_EMAIL
});

mongoose.connection.on('open', function() {
  user.save(function(err, user) {
    if(err) return console.error(err);
    console.log('Created first user', user.name, user.email);
    mongoose.connection.close();
  });
});