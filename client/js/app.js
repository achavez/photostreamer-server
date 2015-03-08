require([
	'collections/photos',
	'models/connection',
	'views/count',
	'views/inspector',
	'views/downloads',
	'views/empty',
	'views/connection',
	'views/photostream',
	'lib/fixHeights',
	'pnotify',
	'pnotify.desktop',
	'imagesLoaded',
	'bootstrap.collapse'
], function(PhotosCollection, ConnectionModel, PhotoCountView, InspectorView, DownloadsView, EmptyView, ConnectionView, PhotostreamView, fixHeights, PNotify) {

$(function() {
	// Setup the connection
	var connectionModel = new ConnectionModel();

	// Populate the Backbone collection and fire up the views
	var photos = new PhotosCollection({
		connection: connectionModel
	});

	photos.fetch({
		success: function() {
			new PhotostreamView({
				el: '#photos',
				collection: photos
			});

			new DownloadsView({
				el: '#downloads',
				collection: photos
			});
		}
	});

	new PhotoCountView({
		el: '#count',
		collection: photos
	});

	new EmptyView({
		el: '#confirm-delete',
		collection: photos,
		trigger: '#delete-photos'
	});

	new ConnectionView({
		el: '#connection-status',
		model: connectionModel
	});

	new InspectorView({
		el: "#inspector",
		collection: photos
	});

	// Setup desktop notifications, if the browser supports it
	var permissionsBox = $("#enable-notifications");

	if(PNotify.desktop.checkPermission()) {
		permissionsBox.on("click", "button", function() {
			PNotify.desktop.permission();
			permissionsBox.remove();
		});
	}
	else {
		permissionsBox.remove();
	}
});

});
