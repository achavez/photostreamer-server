var logfmt = require('logfmt'),
		bodyParser = require('body-parser'),
		express = require('express'),
		mongoose = require('mongoose');

var models = require('./models'),
		controllers = require('./controllers'),
		server = require('./lib/server'),
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

// Photostream viewer page
app.get('/', controllers.client.home);

// Return a list of requested high-resolution photos
app.get('/requests/:sender', controllers.thumbs.requested);

// Stream photo downloads and set the apporpriate headers
app.get('/download/:id', controllers.client.download);

// Make sure all POSTs are application/json
app.use(require('./lib/jsoncheck'));

// Middleware to process JSON body
app.use(bodyParser.json({type: 'application/json'}));

// Process and store thumbnail info
app.post('/photo/thumb', controllers.thumbs.thumbupload);

// Process full-resolution photo uploads
app.post('/photo/full', controllers.thumbs.fullupload);

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
