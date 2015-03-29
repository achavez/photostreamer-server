var session = require('express-session'),
    MongoStore = require('connect-mongo')(session);

var config = require('./config');

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: config.dbUrl
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  }
});