define(['marionette', 'backbone', 'lib/router', 'collections/photos', 'models/connection'], function(Marionette, Backbone, Router, PhotosCollection, ConnectionModel) {

  'use strict';

  var app = new Marionette.Application();

  app.on('start', function() {
    // Setup the router
    var router = new Router();

    // Tack on a 404 route
    router.appRoute(':notFound', 'notFound');

    Backbone.history.start();
  });

  app.data = {};

  // Setup the Backbone photos collection and connection model
  app.data.connection = new ConnectionModel();

  app.data.photos = new PhotosCollection(null, {
    connection: app.data.connection
  });

  app.addRegions({
    main: '#main'
  });

  // Setup a request channel for app data
  var dataChannel = Marionette.Radio.channel('data');

  dataChannel.reply('photos', function() {
    return app.data.photos;
  });

  dataChannel.reply('connection', function() {
    return app.data.connection;
  });

  // And a command channel to fetch app data
  var fetchChannel = Marionette.Radio.channel('fetch');

  fetchChannel.comply('photos', function() {
    app.data.photos.fetch();
  });

  // Channels for handling view updates
  Marionette.Radio.channel('render').comply('layout', function(layoutView, title) {
    $('#page-title').text(title);
    app.getRegion('main').show(layoutView);
  });

  return app;

});