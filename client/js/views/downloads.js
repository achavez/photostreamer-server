define(['marionette', 'backbone', 'views/download', 'tpl'], function(Marionette, Backbone, DownloadItemView, tpl) {

  'use strict';

  return Marionette.CollectionView.extend({

    tagName: 'table',

    className: 'table table-condensed',

    childView: DownloadItemView,

    emptyView: Marionette.ItemView.extend({

      tagName: 'tbody',

      template: '<tr><td colspan="4">There aren\'t any photos available for download yet.</td></tr>'

    }),

    // Prepend the table header every time the view
    // is rendered
    onRender: function(){
      var thead = '<thead>' +
        '<tr>' +
        '<th></th>' +
        '<th>File ID</th>' +
        '<th>Filesize</th>' +
        '<th></th>' +
        '</tr>' +
        '</thead>';
      this.$el.prepend(thead);
    },

    template: tpl.downloads,

    // Only show photos that have a full resolution download
    // available
    filter: function (child) {
      return child.get('full') === 'what';
    }

  });

});
