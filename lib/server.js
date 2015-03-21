var app = require('express')(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io')(server);

// Fire up the app and listen for incoming requests
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
  console.log("Listening on port " + port);
});

module.exports = {
  io: io,
  app: app
};
