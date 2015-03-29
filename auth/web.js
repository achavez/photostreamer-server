var passwordless = require('passwordless'),
    MongoStore = require('passwordless-mongostore');

var email = require('../lib/email'),
    config = require('../lib/config');

passwordless.init(new MongoStore(config.dbUrl));

// Set up a delivery service
passwordless.addDelivery(function(token, uid, recipient, cb) {
  var host = config.https_url;

  email.send({
    text: 'Access your account here: ' +
      host + '/login?token=' + token + '&uid=' +
      encodeURIComponent(uid),
    from: 'do-not-reply@' + host,
    to: recipient,
    subject: 'Login link for Photostreamer'
  }, function(err, message) {
    if(err) return cb(err);
  });
});
