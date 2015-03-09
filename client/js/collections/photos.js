define(['models/photo', 'moment'], function(Photo, moment) {

  'use strict';

  // TODO: Don't use global Backbone

  return Backbone.Collection.extend({

    model: Photo,

    backend: 'photos',

    initialize: function(options) {
      // Setup Backbone.io bidnings
      this.bindBackend();

      // Store our socket connection and re-fetch if the connection is
      // dropped/re-established
      this.connection = options.connection;
      this.connection.on("reconnect", this.fetch, this);
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

    // Empty the database
    dump: function() {
      this.trigger('inspect', null);

      var self = this;
      this.connection.socket.emit('dump', function(success) {
        if(success) {
          self.collection.trigger('dump:success');
        }
        else {
          self.collection.trigger('dump:error');
        }
      });
    }

  });

});
