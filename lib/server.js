var app = require('express')(),
    http = require('http'),
    server = http.createServer(app),
    primus = new (require('Primus'))(server, { transformer: 'engine.io' });

// Fire up the app and listen for incoming requests
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
  console.log("Listening on port " + port);
});

module.exports = {
  primus: primus,
  app: app
};
