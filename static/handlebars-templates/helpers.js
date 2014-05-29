// Handle date formatting with Moment.js
Handlebars.registerHelper('date', function(time, format) {
	var time = moment(time);
	var result = '<time datetime="' + time.toISOString() + '">' + time.format(format) + '</time>';
	return new Handlebars.SafeString(result);
});
// Format file sizes with filesize.js
Handlebars.registerHelper('fsize', function(bytes) {
	return new Handlebars.SafeString(filesize(bytes));
});