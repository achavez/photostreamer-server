var router = require('express').Router();

var controllers = require('../controllers'),
    jsonCheck = require('./jsoncheck');

// Photostream viewer page
router.get('/', controllers.client.home);

// Return a list of requested high-resolution photos
router.get('/requests/:sender', controllers.thumbs.requested);

// Stream photo downloads and set the apporpriate headers
router.get('/download/:id', controllers.client.download);

// Make sure all POSTs are application/json
router.post('/photo*', jsonCheck);

// Process and store thumbnail info
router.post('/photo/thumb', controllers.thumbs.thumbupload);

// Process full-resolution photo uploads
router.post('/photo/full', controllers.thumbs.fullupload);

module.exports = router;