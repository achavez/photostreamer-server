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
// Sort and clean up EXIF data
Handlebars.registerHelper('exif', function(exif) {
	var cleaned = {};
	// Clean up the EXIF data
	_.each(exif, function(value, key, list) {
		// Don't include empty values
		if(!value) return;
		// Split fields into IFD and tag name
		var ifd = key.split(' ')[0];
		var tag = key.split(' ')[1];
		if(typeof(cleaned[ifd]) == "undefined") {
			cleaned[ifd] = [];
		}
		cleaned[ifd].push([tag, value]); 
	});
	// Sort each array by its tag name
	_.each(cleaned, function(value, key, list) {
		value.sort();
	});
	// Build markup from arrays
	var output = '<div class="panel-group" id="exif-accordion">';
	_.each(cleaned, function(value, key, list) {
		output += '<div class="panel panel-default">';
		output += '<div class="panel-heading">' +
			'<a data-toggle="collapse" data-parent="#exif-accordion" href="#collapse-' + key + '">' +
			'<h4 class="panel-title">' +
			key + '</a></h4></div>';
		output += '<div id="collapse-' + key + '" class="panel-collapse collapse"><div class="panel-body">';
		output += '<ul class="list-unstyled">';
		_.each(value, function(element, index, list) {
			output += '<li><strong>' + element[0] + '</strong> ' + element[1] + '</li>';
		});
		output += '</ul>';
		output += '</div></div>';
		output += '</div>';
	});
	output += '</div>';
	return new Handlebars.SafeString(output);
});