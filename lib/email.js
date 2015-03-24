var email = require('emailjs');

module.exports = email.server.connect({
  user: process.env.MAILGUN_SMTP_LOGIN,
  password: process.env.MAILGUN_SMTP_PASSWORD,
  host: process.env.MAILGUN_SMTP_SERVER,
  port: process.env.MAILGUN_SMTP_PORT
});