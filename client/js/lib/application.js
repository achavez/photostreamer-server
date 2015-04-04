define(['marionette', 'backbone', 'collections/photos', 'models/connection'], function(Marionette, Backbone, PhotosCollection, ConnectionModel) {

  'use strict';

  var app = new Marionette.Application();

  app.on('start', function() {
    Backbone.history.start();

    app.data.photos.fetch();
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

  return app;

});