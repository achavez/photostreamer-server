define(['backbone', 'models/photo', 'moment'], function(Backbone, Photo, moment) {

  'use strict';

  return Backbone.Collection.extend({

    initialize: function(options) {
      // Store our socket connection and re-fetch if the connection is
      // dropped/re-established
      this.connection = options.connection;
      this.connection.on('reconnect', this.fetch, this);

      // Duplicate important Backbone.io events with Socket.io
      var self = this;
      this.connection.socket.on('created', function(photo) {
        self.add(photo);
      });
      this.connection.socket.on('updated', function(photo) {
        self.add(photo, {merge: true});
      });
    },

    // Pluck a model from the collection for inspection; event will cause
    // photo to render in InspectorView
    inspect: function(photo) {
      var toInspect = this.get(photo);
      this.trigger('inspect', toInspect);
    },

    // Sort by creation time in descending order
    comparator: function(photo) {
      return -moment(photo.get('created')).unix();
    },

    model: Photo,

    // URL to the express-restify-mongoose API
    url: '/api/v1/photos',

    // Empty the database
    dump: function() {
      // Send a DELETE to remove all models from the server
      this.sync('delete', this, {
        success: function(ctx) {
          this.reset();
          this.trigger('dump:success');
        }.bind(this),
        error: function() {
          this.trigger('dump:error');
        }.bind(this)
      });
    }

  });

});
