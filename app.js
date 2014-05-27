var logfmt = require('logfmt');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var models = require('./models');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photostreamer');

// Serve static files
app.use(express.static(__dirname + '/static'));

// Enable logging using logfmt
app.use(logfmt.requestLogger());

// View rendering
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').__express);

app.get('/', function(req, res){
	res.render('photo-stream.html');
});

// Return a list of requested high-resolution photos
app.get('/requests/:sender', function(req, res) {
	// WORK IN PROGRESS
	models.Thumbnail.find({ 'requested': false }, function (err, thumbnail) {
		if (err) {
			console.error(err);
		}
		else {
			res.json(200, thumbnail);
		}
	})
});

// Make sure all POSTs are application/json
app.use(function(req, res, next) {
	if(req.method == 'POST') {
		if(!req.is('application/json')) {
			res.json(400, {
				"error": {
					"message": "Data must be submitted as application/json."
				}
			});		
		}
		else {
			next();
		}
	}
	else {
		next();
	}
});

// Middleware to process JSON body
app.use(bodyParser.json({type: 'application/json'}));

// Process and store thumbnail info
app.post('/photo/thumb', function(req, res, next){
	var thumb = new models.Thumbnail(req.body);
	thumb.save(function (err) {
		if (err) {
			res.json(400, err);
			console.error(err);
		}
		else {
			res.send(200);
			backend.emit('created', thumb);
			console.log("Thumbnail " + thumb.fileid + " stored in the database.")
		}
	});
});

// Process full-resolution photo uploads
app.post('/photo/full', function(req, res, next) {

});

// Use backbone.io to sync Mongoose models with clients
var http = require('http');
var server = http.createServer(app);
var backboneio = require('backbone.io');
var backend = backboneio.createBackend();
backend.use(backboneio.middleware.mongooseStore(models.Thumbnail));
var io = backboneio.listen(server, {
	photos: backend
});
io.sockets.on('connection', function(socket) {
	console.log('Someone just connected.');
});

// Fire up the app and listen for incoming requests
var port = Number(process.env.PORT || 8080);
server.listen(port, function() {
	console.log("Listening on port " + port);
});