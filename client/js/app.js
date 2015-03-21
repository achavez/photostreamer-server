require([
	'collections/photos',
	'models/connection',
	'views/count',
	'views/inspector',
	'views/downloads',
	'views/empty',
	'views/connection',
	'views/photostream',
	'views/notifications',
	'imagesLoaded',
	'bootstrap.collapse'
], function(PhotosCollection, ConnectionModel, PhotoCountView, InspectorView, DownloadsView, EmptyView, ConnectionView, PhotostreamView, NotificationsView) {

	$(function() {
		// Setup the Backbone photos collection and connection model
		var photos = new PhotosCollection({
			connection: new ConnectionModel()
		});

		// Setup views
		new PhotostreamView({
			el: '#photos',
			collection: photos
		});

		new DownloadsView({
			el: '#downloads',
			collection: photos
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
			collection: photos
		});

		new InspectorView({
			el: "#inspector",
			collection: photos
		});

		new NotificationsView({
			el: '#enable-notifications',
			collection: photos
		});

		photos.fetch();
	});

});
