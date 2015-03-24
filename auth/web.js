var passwordless = require('passwordless'),
    MongoStore = require('passwordless-mongostore');

var email = require('../lib/email'),
    controllers = require('../controllers'),
    config = require('../lib/config');

passwordless.init(new MongoStore(config.dbUrl));

// Set up a delivery service
passwordless.addDelivery(function(token, uid, recipient, cb) {
  var host = config.https_url;

  email.send({
    text: 'Hello!\nAccess your account here: ' +
      host + '?token=' + token + '&uid=' +
      encodeURIComponent(uid),
    from: 'do-not-reply@' + host,
    to: recipient,
    subject: 'Login link for Photostreamer'
  }, function(err, message) {
    if(err) cb(err);
  });
});

// A middleware function to setup auth on the Express app
module.exports = function(req, res, next) {
  var app = req.app;

  app.use(passwordless.sessionSupport());
  app.use(passwordless.acceptToken({ successRedirect: '/'}));

  app.get('/login', controllers.auth.login);
  app.post('/login', controllers.auth.sendtoken);
  app.get('/login/found', controllers.auth.found);
  app.get('/login/notfound', controllers.auth.notfound);

  next();
};