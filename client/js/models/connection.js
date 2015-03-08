define(function() {

  'use strict';

  // TODO: Don't use global Backbone

  return Backbone.Model.extend({

    initialize: function() {
      // Setup a Backbone.io connection
      this.socket = Backbone.io.connect();

      // Trigger Backbone events for socket events
      this.socket.on('connect', this.connected.bind(this));
      this.socket.on('disconnect', this.disconnected.bind(this));
      this.socket.on('reconnect', this.reconnected.bind(this));
    },

    connected: function() {
      this.trigger('connect');
    },

    disconnected: function() {
      this.trigger('disconnect');
    },

    reconnected: function() {
      this.trigger('reconnect');
    }

  });

});
