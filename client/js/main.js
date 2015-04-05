require([
	'lib/application',
	'itemviews/count',
	'itemviews/connection',
	'views/notifications',
	'layouts/stream',
	'bootstrap.collapse'
], function(application, PhotoCountView, ConnectionView, NotificationsView, StreamLayout) {

	$('body').removeClass('loading');

	// Persist these across app states
	new ConnectionView({
		el: '#connection-status',
		model: application.data.connection
	});

	new PhotoCountView({
		el: '#count',
		collection: application.data.photos
	});

	new NotificationsView({
		data: application.data
	});

	application.start();

	application.getRegion('main').show(new StreamLayout({
		data: application.data
	}));

});
