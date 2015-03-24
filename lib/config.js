module.exports = {
  http_url: process.env.HTTP_URL || 'http://' + process.env.APP_NAME + '.herokuapp.com/',
  https_url: process.env.HTTPS_URL || 'https://' + process.env.APP_NAME + '.herokuapp.com/',
  dbUrl: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.MONGODB_URL
};