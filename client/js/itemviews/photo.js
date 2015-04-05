define(['marionette', 'tpl'], function(Marionette, tpl) {

  'use strict';

  return Marionette.ItemView.extend({

    template: tpl['items.photo'],

    className: 'photo col-xs-12 col-sm-6 col-md-4 col-lg-3',

    ui: {
      request: '.request-full',
      inspect: '.inspect'
    },

    events: {
      'click @ui.request': 'request',
      'click @ui.inspect': 'inspect'
    },

    modelEvents: {
      'change': 'render'
    },

    request: function() {
      this.model.request();
    },

    inspect: function() {
      this.triggerMethod('photo:inspect');
    }

  });

});
