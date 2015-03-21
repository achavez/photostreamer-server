define(['backbone'], function (Backbone) {

  'use strict';

  return Backbone.View.extend({

    initialize: function() {
      this.collection.connection.on('change:connected', this.change, this);
    },

    connectedLabel: '<i class="glyphicon glyphicon-ok-circle"></i> Connected',
    disconnectedLabel: '<i class="glyphicon glyphicon-remove-circle"></i> Can\'t connect to server',

    change: function(conn) {
      if(conn.get('connected') === true) {
        this.connected();
      }
      else {
        this.disconnected();
      }
    },

    disconnected: function() {
      this.$el.html(this.disconnectedLabel);
      this.$el.removeClass('label-success');
      this.$el.addClass('label-danger');
    },

    connected: function() {
      this.$el.html(this.connectedLabel);
      this.$el.removeClass('label-danger label-warning');
      this.$el.addClass('label-success');
    }

  });

});
