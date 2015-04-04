define(['marionette', 'layouts/stream', 'backbone', 'collections/photos', 'models/connection'], function(Marionette, StreamLayout, Backbone, PhotosCollection, ConnectionModel) {

  'use strict';

  var app = new Marionette.Application();

  app.on('start', function() {
    Backbone.history.start();

    app.photos.fetch();
  });

  app.connection = new ConnectionModel();

  // Setup the Backbone photos collection and connection model
  app.photos = new PhotosCollection(null, {
    connection: app.connection
  });

  app.stream = new StreamLayout();

  return app;

});