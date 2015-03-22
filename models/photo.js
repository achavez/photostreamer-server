var mongoose = require('mongoose'),
    validator = require('validator');

// Validate URLs using validator.js
var urlValidator = [function(val) {
  return validator.isURL(val, {
    protocols: ['http','https'],
    require_tld: true,
    require_protocol: true
  });
}, '{PATH} must be a valid http:// or https:// URL.'];

var photoSchema = new mongoose.Schema({

  created: {
    type: Date,
    default: Date.now
  },

  sender: {
    type: Number,
    required: true,
    min: 0,
    index: true
  },

  filesize: {
    type: Number,
    required: true,
    min: 1
  },

  fileid: {
    type: String,
    required: true,
    index: true
  },

  thumbnail: {
    type: String,
    required: true,
    validate: urlValidator
  },

  full: {
    type: String,
    validate: urlValidator
  },

  exif: {
    type: Object
  },

  requested: {
    type: Boolean,
    required: true,
    default: false,
    index: true
  },

  downloaded: {
    type: Boolean,
    required: true,
    default: false
  }

});

module.exports = mongoose.model('Photo', photoSchema);
