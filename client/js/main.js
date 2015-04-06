require([
	'lib/app',
	'itemviews/count',
	'itemviews/connection',
	'views/notifications',
	'bootstrap.collapse'
], function(app, PhotoCountView, ConnectionView, NotificationsView) {

	// Persist these across app states
	new ConnectionView({
		el: '#connection-status',
		model: Marionette.Radio.channel('data').request('connection')
	});

	new PhotoCountView({
		el: '#count',
		collection: Marionette.Radio.channel('data').request('photos')
	});

	new NotificationsView();

	app.start();

});
