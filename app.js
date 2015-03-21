var logfmt = require('logfmt'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		express = require('express'),
		restify = require('express-restify-mongoose'),
		mongoose = require('mongoose');

var models = require('./models'),
		app = require('./lib/server').app,
		router = require('./lib/router');

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
