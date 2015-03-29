var session = require('express-session'),
    MongoStore = require('connect-mongo')(session);

var config = require('../lib/config');

// This needs to match lib/session.js
var store = new MongoStore({
  url: config.dbUrl
});

/*
* Auth middleware for Primus sockets. Just checks to see if
* the user is already authenticated using the Web auth method.
*
* Also populates req.session for the passed spark.
*
* Based heavily on: https://github.com/primus/primus/tree/master/examples/middleware
*/

module.exports = function (req, next) {
  // Get the session ID from the cookies (parsed by earlier
  // cookie-parser middleware)
  //
  // This needs to match lib/session.js
  var sid = req.signedCookies['connect.sid'];

  // If there's no session cookie, move on
  if (!sid) return next({
    statusCode: 401
  });

  // Build the session object
  req.session = {};

  // Pause the request before retrieving the session
  req.pause();

  // Lookup the session
  store.get(sid, function (err, session) {
    // Resume the request
    req.resume();

    // Handle errors
    if (err) {
      primus.emit('log', 'error', err);
      return next({
        statusCode: 500
      });
    }

    // Populate the session
    if (session) req.session = session;

    // Make sure the session is for an authorized user
    if(!req.session.hasOwnProperty('passwordless')) {
      return next({
        statusCode: 401
      });
    }

    // If the user is authed, fire up the socket
    next();
  });
};