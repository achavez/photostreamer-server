var logfmt = require('logfmt'),
		express = require('express'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		methodOverride = require('method-override');

var app = require('./lib/server').app,
		api = require('./lib/api'),
		auth = require('./auth'),
		config = require('./lib/config'),
		router = require('./lib/router'),
		session = require('./lib/session');

// Connect to the database
mongoose.connect(config.dbUrl);

// Serve static files
app.use(express.static(__dirname + '/static'));

// Trust proxies, because Heroku
app.set('trust proxy', 1);

// Enable logging using logfmt
app.use(logfmt.requestLogger());

// View rendering
app.engine('hbs', require('express3-handlebars')({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

// Add middleware required to process API requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// Session middleware
app.use(session);

// Setup RESTful API with Restify
app.use(api);

// Add Express router for client and old API routes
app.use(auth.web);
app.use(router);
