require([
	'lib/application',
	'views/count',
	'views/inspector',
	'views/downloads',
	'views/delete',
	'views/connection',
	'views/photostream',
	'views/notifications',
	'views/desktopNotifications',
	'imagesLoaded',
	'bootstrap.collapse'
], function(application, PhotoCountView, InspectorView, DownloadsView, DeleteView, ConnectionView, PhotostreamView, NotificationsView, DesktopNotificationsView) {

	$('body').removeClass('loading');

	// Persist this across app states
	new ConnectionView({
		el: '#connection-status',
		collection: application.photos
	});

	// Setup views for photo stream layout
	var stream = new PhotostreamView({
		collection: application.photos
	});

	var inspector = new InspectorView();

	var downloads = new DownloadsView({
		collection: application.photos
	});

	new PhotoCountView({
		el: '#count',
		collection: application.photos
	});

	var desktop = new DesktopNotificationsView({
		collection: application.photos
	});

	new NotificationsView({
		collection: application.photos
	});

	var deleteButton = new DeleteView({
		collection: application.photos
	});

	application.start();

	application.stream.render();
	application.stream.showChildView('stream', stream);
	application.stream.showChildView('inspector', inspector);
	application.stream.showChildView('downloads', downloads);
	application.stream.showChildView('delete', deleteButton);
	application.stream.showChildView('notifications', desktop);
	application.photos.on('inspect', function(toInspect) {
		var inspector = new InspectorView({
			model: toInspect
		});
		application.stream.showChildView('inspector', inspector);
	});

});
