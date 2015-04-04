define(['marionette'], function(Marionette) {

  'use strict';

  return Marionette.ItemView.extend({

    template: function(collection) {
      return collection.items.length;
    },

    collectionEvents: {
      'add': 'render',
      'reset': 'render'
    }

  });

});
