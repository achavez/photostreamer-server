define(['backbone'], function(Backbone) {

  'use strict';

  return Backbone.Model.extend({

    initialize: function() {
      // Setup a websocket connection for model updates
      this.socket = new Primus();

      // Emit socket data as Backbone events
      this.socket.on('data', this.emitter, this);

      // Trigger Backbone events for socket connection/disconnection
      this.socket.on('open', this.connected.bind(this));
      this.socket.on('reconnect', this.disconnected.bind(this));
      this.socket.on('reconnected', this.reconnected.bind(this));

      // Push errors to the console
      this.socket.on('error', function error(err) {
        console.error('Photostreamer: Websocket error:', err.stack);
      });
    },

    defaults: {
      connected: false
    },

    emitter: function(d) {
      this.trigger(d.evt, d.data);
    },

    connected: function() {
      this.set('connected', true);
    },

    disconnected: function() {
      this.set('connected', false);
    },

    reconnected: function() {
      this.set('connected', true);
      this.trigger('reconnected');
    }

  });

});
