var logfmt = require('logfmt'),
		express = require('express'),
		bodyParser = require('body-parser'),
		methodOverride = require('method-override'),
		mongoose = require('mongoose');

var app = require('./lib/server').app,
		api = require('./lib/api'),
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

// Setup RESTful API with Restify
app.use(api);

// Add Express router for client and old API routes
app.use(router);
