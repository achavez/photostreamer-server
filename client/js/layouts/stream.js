define([
  'marionette',
  'views/photostream',
  'views/inspector',
  'views/downloads',
  'views/delete',
  'views/desktopNotifications',
  'tpl'
], function(Marionette, PhotostreamView, InspectorView, DownloadsView, DeleteView, DesktopNotificationsView, tpl) {

  'use strict';

  return Marionette.LayoutView.extend({

    initialize: function(opts) {
      this.data = opts.data;
    },

    onBeforeShow: function() {

      this.showChildView('stream', new PhotostreamView({
        collection: this.data.photos
      }));

      this.showChildView('inspector', new InspectorView());

      this.showChildView('downloads', new DownloadsView({
        collection: this.data.photos
      }));

      this.showChildView('delete', new DeleteView({
        collection: this.data.photos
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

    template: tpl.stream,

    regions: {
      notifications: '#desktop-notifications',
      stream: '#stream',
      inspector: '#inspector',
      downloads: '#downloads',
      delete: '#delete'
    }

  });

});