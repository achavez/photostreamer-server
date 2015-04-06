define([
  'marionette',
  'backbone',
  'lib/router',
  'collections/photos',
  'collections/users',
  'models/connection',
  'itemviews/count',
  'itemviews/connection',
  'views/notifications'
], function(Marionette, Backbone, Router, PhotosCollection, UsersCollection, ConnectionModel, PhotoCountView, ConnectionView, NotificationsView) {

  'use strict';

  var app = new Marionette.Application();

  app.on('start', function() {
    // Setup the router
    var router = new Router();

    // Tack on a 404 route
    //router.appRoute(':notFound', 'notFound');

    Backbone.history.start();

    // Setup views that persist across app states
    new ConnectionView({
      el: '#connection-status',
      model: app.data.connection
    });

    new PhotoCountView({
      el: '#count',
      collection: app.data.photos
    });

    new NotificationsView();
  });

  // Setup empty collection for app data
  app.data = {
    connection: new ConnectionModel(),
    users: new UsersCollection()
  };
  app.data.photos = new PhotosCollection(null, {
    connection: app.data.connection
  });

  app.addRegions({
    main: '#main'
  });

  var radio = Marionette.Radio.channel('app');

  // Setup a request channel for app data
  radio.reply('data', function(key) {
      return app.data[key];
    });

  // And a command channel to trigger a fetch for app data
  radio.comply('fetch', function(key) {
      return app.data[key].fetch();
    });

  // Channel for rendering top-level views
  radio.comply('render', function(layoutView, title) {
      $('#page-title').text(title);
      app.getRegion('main').show(layoutView);
    });

  return app;

});