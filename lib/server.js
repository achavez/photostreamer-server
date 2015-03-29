var Primus = require('primus'),
    app = require('express')(),
    http = require('http'),
    cookieParser = require('cookie-parser'),
    server = http.createServer(app);

var auth = require('../auth');

// Setup websockets
var primus = new Primus(server, {
  transformer: 'engine.io'
});

primus.before('cookies', cookieParser(process.env.SESSION_SECRET), {}, 0);
primus.authorize(auth.socket);

// Fire up the app and listen for incoming requests
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
  console.log("Listening on port " + port);
});

module.exports = {
  primus: primus,
  app: app
};
