define(['marionette', 'tpl', 'bootstrap.collapse'], function(Marionette, tpl) {

  'use strict';

  return Marionette.ItemView.extend({

    template: tpl['items.inspector'],

    ui: {
      request: '.request-full'
    },

    events: {
      'click @ui.request': 'request',
    },

    modelEvents: {
      'change': 'render'
    },

    request: function() {
      this.model.request();
    }

  });

});
