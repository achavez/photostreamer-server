define(['pnotify', 'pnotify.desktop'], function(PNotify) {

  'use strict';

  // TODO: Don't use global Backbone or Underscore

  return Backbone.View.extend({

    initialize: function() {
      // Check if the browser supports desktop notifications; if it does,
      // show a prompt to enable
      if(PNotify.desktop.checkPermission()) {
        this.$el.on('click', 'button', function() {
          PNotify.desktop.permission();
          this.$el.remove();
        });
      }
      else {
        this.$el.remove();
      }

      // When a full download becomes available, trigger a notification
      this.collection.on('change', this.downloadAvailable, this);

      // Notifications for database empty process
      this.collection.on('dump:success', this.emptySuccess, this);
      this.collection.on('dump:error', this.emptyError, this);

      // Notifications for connection events
      this.collection.connection.on('reconnect', this.reconnected, this);
      this.collection.connection.on('disconnect', this.disconnected, this);
    },

    defaults: {
      desktop: {
        desktop: true
      }
    },

    /*
     * Notification for when there's a download available
     */
    downloadAvailable: function(photo) {
      if(photo.hasChanged('full')) {
        new PNotify(_.extend({
          title: 'New download',
          text: photo.get('fileid') + ' available for download.',
          icon: 'glyphicon glyphicon-download-alt'
        }, this.defaults));
      }
    },

    /*
     * Notifications for database emptying flow
     */
    emptySuccess: function() {
      new PNotify(_.extend({
        title: 'Database reset',
        text: 'The database is now empty. New photos will show as they arrive.',
        type: 'success'
      }, this.defaults));
    },

    emptyError: function() {
      new PNotify(_.extend({
        title: 'Error dumping database',
        text: 'There was a problem dumping the photo database. Try refreshing your browser and try again.',
        type: 'error'
      }, this.defaults));
    },

    /*
     * Notifications for Socket.io connection events
     */
    disconnected: function() {
      new PNotify(_.extend({
        title: 'Server connection lost',
        text: 'New photos won\'t show and you won\'t be able to request photos until you\'re reconnected.',
        type: 'error',
        icon: 'glyphicon glyphicon-remove-circle',
      }, this.defaults));
    },

    reconnected: function() {
      new PNotify(_.extend({
        title: 'Server connection restored',
        text: 'Everything should be back to normal.',
        type: 'success',
        icon: 'glyphicon glyphicon-ok-circle'
      }, this.defaults));
    }

  });

});
