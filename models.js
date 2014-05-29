var mongoose = require('mongoose');

var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose, "Url");
var Url = mongoose.SchemaTypes.Url;

var Schema = mongoose.Schema;

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
		type: Url,
		required: true
	},
	full: {
		type: Url
	},
	dimensions: {
		width: {
			type: Number,
			min: 1,
			required: true
		},
		height: {
			type: Number,
			min: 1,
			required: true
		}
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