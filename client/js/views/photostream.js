define(['marionette', 'views/photo', 'tpl'], function(Marionette, PhotoView, tpl) {

  'use strict';

  return Marionette.CollectionView.extend({

    className: 'row',

    childView: PhotoView,

    emptyView: Marionette.ItemView.extend({
      template: tpl.photostreamEmpty
    })

  });

});
