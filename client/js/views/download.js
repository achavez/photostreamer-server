define(['marionette', 'tpl'], function(Marionette, tpl) {

  'use strict';

  return Marionette.ItemView.extend({

    tagName: 'tr',

    template: tpl.download,

    modelEvents: {
      'change': 'render'
    }

  });

});