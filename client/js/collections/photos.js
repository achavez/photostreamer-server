define(['backbone', 'models/photo', 'moment'], function(Backbone, Photo, moment) {

  'use strict';

  return Backbone.Collection.extend({

    initialize: function(models, options) {
      // Store our socket connection and re-fetch if the connection is
      // dropped/re-established
      this.connection = options.connection;
      this.connection.on('reconnected', this.fetch, this);

      // Listen for websocket updates
      this.connection.on('photo:add', this.add, this);
      this.connection.on('photo:change', function(photo) {
        this.add(photo, {merge: true});
      }, this);
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
