var logfmt = require('logfmt');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var models = require('./models');

var mongoDb = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.MONGODB_URL;

var mongoose = require('mongoose');
mongoose.connect(mongoDb);

// Serve static files
app.use(express.static(__dirname + '/static'));

// Enable logging using logfmt
app.use(logfmt.requestLogger());

// View rendering
app.engine('hbs', require('express3-handlebars')({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

// Photostream viewer page
app.get('/', function(req, res){
	res.render('photostream.hbs', {
		debug: global.v8debug !== "undefined"
	});
});

// Return a list of requested high-resolution photos
app.get('/requests/:sender', function(req, res) {
	models.Thumbnail.find({ 'requested': true, 'full': null }, 'fileid', function (err, results) {
		if (err) {
			console.error(err);
		}
		else {
			var thumbnails = [];
			results.forEach(function(result) {
				thumbnails.push(result.fileid);
			});
			res.json(200, thumbnails);
		}
	});
});

var https = require('https');
// Stream photo downloads and set the apporpriate headers
app.get('/download/:id', function(req, res) {
	var id = req.param('id');
	models.Thumbnail.findOne({'_id': id}, function(err, thumb) {
		if (err) {
			res.send(500, err);
			console.error(err);
		}
		else if (thumb) {
			var protocol = thumb.full.split('://')[0];
			if(protocol == 'https') {
				https.get(thumb.full, function(download) {
					streamDownload(res, download, thumb);
				});
			}
			else if(protocol == 'http') {
				http.get(thumb.full, function(download) {
					streamDownload(res, download, thumb);
				});
			}
		}
		else {
			res.send(400, 'Photo with file ID ' + id + ' not found.');
		}
	});
});

function streamDownload(res, download, thumb) {
	console.log("Initiating download for " + thumb.full);
	res.attachment();
	download.pipe(res, {end: false});
	download.on('end', function() {
		res.end();
		thumb.downloaded = true;
		thumb.save(function (err) {
			if (err) {
				console.error(err);
			}
			else {
				backend.emit('updated', thumb);
			}
		});
	});
}

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
			console.log("Thumbnail " + thumb.fileid + " stored in the database.");
		}
	});
});

// Process full-resolution photo uploads
app.post('/photo/full', function(req, res, next) {
	models.Thumbnail.findOne({fileid: req.body.fileid, sender: req.body.sender}, function (err, thumb) {
		if (err) {
			res.json(400, err);
			console.error(err);
		}
		else {
			thumb.full = req.body.full;
			thumb.requested = true;
			thumb.save(function (err) {
				if (err) {
					res.json(400, err);
				}
				else {
					console.log("Full resolution photo for " + thumb.fileid + " submitted.");
					backend.emit('updated', thumb);
					res.send(200);
				}
			});
		}
	});
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

// Remove thumbs when a dump is requested
io.sockets.on('connection', function(socket) {
	socket.on('dump', function(fn) {
		console.log("Dumping thumbs from database");
		var remove = models.Thumbnail.find({}).remove();
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

// Fire up the app and listen for incoming requests
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
	console.log("Listening on port " + port);
});
