var config = {
  http_url: 'http://' + process.env.APP_NAME + '.herokuapp.com/',
  https_url: 'https://' + process.env.APP_NAME + '.herokuapp.com/',
  dbUrl: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.MONGODB_URL
};

if(typeof process.env.HTTP_URL !== 'undefined') {
  config.http_url = process.env.HTTP_URL;
}

if(typeof process.env.HTTPS_URL !== 'undefined') {
  config.https_url = process.env.HTTPS_URL;
}

module.exports = config;