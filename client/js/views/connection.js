define(['pnotify', 'pnotify.desktop'], function (PNotify) {

  'use strict';

  // TODO: Don't use global backbone

  return Backbone.View.extend({

    initialize: function() {
      this.model.on('connect', this.connected, this);
      this.model.on('reconnect', this.reconnected, this);
      this.model.on('disconnect', this.disconnected, this);
    },

    connectedLabel: '<i class="glyphicon glyphicon-ok-circle"></i> Connected',
    disconnectedLabel: '<i class="glyphicon glyphicon-remove-circle"></i> Can\'t connect to server',

    disconnected: function() {
      this.$el.html(this.disconnectedLabel);
      this.$el.removeClass('label-success');
      this.$el.addClass('label-danger');

      new PNotify({
        title: 'Server connection lost',
        text: 'New photos won\'t show and you won\'t be able to request photos until you\'re reconnected.',
        type: 'error',
        icon: 'glyphicon glyphicon-remove-circle',
        desktop: {
          desktop: true
        }
      });
    },

    connected: function() {
      this.$el.html(this.connectedLabel);
      this.$el.removeClass('label-danger label-warning');
      this.$el.addClass('label-success');
    },

    reconnected: function() {
      this.connected();

      new PNotify({
        title: 'Server connection restored',
        text: 'Everything should be back to normal.',
        type: 'success',
        icon: 'glyphicon glyphicon-ok-circle',
        desktop: {
          desktop: true
        }
      });
    }

  });

});
