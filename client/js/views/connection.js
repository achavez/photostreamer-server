define(function () {

  'use strict';

  // TODO: Don't use global backbone

  return Backbone.View.extend({

    initialize: function() {
      this.collection.connection.on('connect', this.connected, this);
      this.collection.connection.on('reconnect', this.reconnected, this);
      this.collection.connection.on('disconnect', this.disconnected, this);
    },

    connectedLabel: '<i class="glyphicon glyphicon-ok-circle"></i> Connected',
    disconnectedLabel: '<i class="glyphicon glyphicon-remove-circle"></i> Can\'t connect to server',

    disconnected: function() {
      this.$el.html(this.disconnectedLabel);
      this.$el.removeClass('label-success');
      this.$el.addClass('label-danger');
    },

    connected: function() {
      this.$el.html(this.connectedLabel);
      this.$el.removeClass('label-danger label-warning');
      this.$el.addClass('label-success');
    },

    reconnected: function() {
      this.connected();
    }

  });

});
