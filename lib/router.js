var router = require('express').Router(),
    passwordless = require('passwordless');

var controllers = require('../controllers'),
    jsonCheck = require('./jsoncheck');

/* Authorization routes */

router.get('/login', controllers.auth.login);
router.post('/login', controllers.auth.sendtoken);
router.get('/logout', controllers.auth.logout);

/* Client routes */

// Photostream viewer page
router.get('/', passwordless.restricted({ failureRedirect: '/login' }), controllers.client.home);

// Return a list of requested high-resolution photos
router.get('/requests/:sender', controllers.thumbs.requested);

// Stream photo downloads and set the apporpriate headers
router.get('/download/:id', passwordless.restricted(), controllers.client.download);

// Make sure all POSTs are application/json
router.post('/photo*', jsonCheck);

// Process and store thumbnail info
router.post('/photo/thumb', controllers.thumbs.thumbupload);

// Process full-resolution photo uploads
router.post('/photo/full', controllers.thumbs.fullupload);

module.exports = router;