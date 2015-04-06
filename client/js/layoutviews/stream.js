define([
  'marionette',
  'collectionviews/photostream',
  'itemviews/inspector',
  'collectionviews/downloads',
  'itemviews/delete',
  'views/desktopNotifications',
  'tpl'
], function(Marionette, PhotostreamView, InspectorView, DownloadsView, DeleteView, DesktopNotificationsView, tpl) {

  'use strict';

  return Marionette.LayoutView.extend({

    initialize: function() {
      // Fetch the view data
      Marionette.Radio.channel('fetch').command('photos');
    },

    onBeforeShow: function() {

      var photos = Marionette.Radio.channel('data').request('photos');

      this.showChildView('stream', new PhotostreamView({
        collection: photos
      }));

      this.showChildView('inspector', new InspectorView());

      this.showChildView('downloads', new DownloadsView({
        collection: photos
      }));

      this.showChildView('delete', new DeleteView({
        collection: photos
      }));

      this.showChildView('notifications', new DesktopNotificationsView());

    },

    // Handle inspector toggling
    childEvents: {
      'photo:inspect': function(view) {
        this.showChildView('inspector', new InspectorView({
          model: view.model
        }));
      }
    },

    destroyImmediate: true,

    template: tpl['layouts.stream'],

    regions: {
      notifications: '#desktop-notifications',
      stream: '#stream',
      inspector: '#inspector',
      downloads: '#downloads',
      delete: '#delete'
    }

  });

});