require([
	'lib/application',
	'views/count',
	'views/connection',
	'views/notifications',
	'layouts/stream',
	'imagesLoaded',
	'bootstrap.collapse'
], function(application, PhotoCountView, ConnectionView, NotificationsView, StreamLayout) {

	$('body').removeClass('loading');

	// Persist these across app states
	new ConnectionView({
		el: '#connection-status',
		collection: application.data.photos
	});

	new PhotoCountView({
		el: '#count',
		collection: application.data.photos
	});

	new NotificationsView({
		collection: application.data.photos
	});

	application.start();

	application.getRegion('main').show(new StreamLayout({
		data: application.data
	}));

});
