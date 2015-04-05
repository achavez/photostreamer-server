define(['marionette', 'tpl'], function (Marionette, tpl) {

  'use strict';

  return Marionette.ItemView.extend({

    modelEvents: {
      'change:connected': 'render'
    },

    template: tpl['items.connection']

  });

});
