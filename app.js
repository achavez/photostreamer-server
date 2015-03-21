var logfmt = require('logfmt'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		express = require('express'),
		restify = require('express-restify-mongoose'),
		mongoose = require('mongoose');

var models = require('./models'),
		server = require('./lib/server'),
		router = require('./lib/router'),
		app = server.app;

var mongoDb = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.MONGODB_URL;
mongoose.connect(mongoDb);

// Serve static files
app.use(express.static(__dirname + '/static'));

// Enable logging using logfmt
app.use(logfmt.requestLogger());

// View rendering
app.engine('hbs', require('express3-handlebars')({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

// Add middleware required to process API requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// Auto-restify Mongoose models
restify.serve(router, models.Photo, {lowercase: true});

// Add Express router
app.use(router);

// Remove thumbs when a dump is requested
server.io.sockets.on('connection', function(socket) {
	socket.on('dump', function(fn) {
		console.log("Dumping thumbs from database");
		var remove = models.Photo.find({}).remove();
		remove.exec(function (err, docs) {
			if(err) {
				console.error(err);
				fn(false);
			}
			else {
				fn(true);
			}
		});
	});
});
