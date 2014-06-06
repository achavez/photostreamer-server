var mongoose = require('mongoose');

var validator = require('validator');

var Schema = mongoose.Schema;

// Validate URLs using validator.js
var urlValidator = [function(val) {
	return validator.isURL(val, {
		protocols: ['http','https'],
		require_tld: true,
		require_protocol: true
	});
}, '{PATH} must be a valid http:// or https:// URL.']

var thumbnailSchema = new Schema({
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

exports.Thumbnail = mongoose.model('Thumbnail', thumbnailSchema);