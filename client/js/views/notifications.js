define(['marionette', 'pnotify', 'pnotify.desktop'], function(Marionette, PNotify) {

  'use strict';

  return Marionette.View.extend({

    initialize: function(opts) {
      // Request our data from the app
      var radio = Marionette.Radio.channel('app');

      var photos = radio.request('data', 'photos'),
          connection = radio.request('data', 'connection');

      // When a full download becomes available, trigger a notification
      this.listenTo(photos, 'change', this.downloadAvailable);

      // Notifications for database empty process
      this.listenTo(photos, 'dump:success', this.emptySuccess);
      this.listenTo(photos, 'dump:error', this.emptyError);

      // Notifications for connection events
      this.listenTo(connection, 'reconnected', this.reconnected);
      this.listenTo(connection, 'change:connected', this.disconnected);
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
     * Notifications for websocket connection events
     */
    disconnected: function(conn) {
      // Only fire if we've been disconnected
      if(conn.get('connected') === true) {
        return;
      }

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
