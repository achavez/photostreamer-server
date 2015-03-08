define(['lib/socket'], function(socket) {

  'use strict';

  // TODO: Don't use global Backbone

  return Backbone.Model.extend({

    initialize: function() {
      // Trigger Backbone events for socket events
      socket.on('connect', this.connected.bind(this));
      socket.on('disconnect', this.disconnected.bind(this));
      socket.on('reconnect', this.reconnected.bind(this));
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
