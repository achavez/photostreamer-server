define(['marionette', 'tpl', 'backbone.stickit'], function(Marionette, tpl) {

  'use strict';

  return Marionette.ItemView.extend({

    template: tpl['items.user'],

    // Use backbone.stickit to bind the view and model data
    bindings: {
      '.name': {
        observe: 'name',
        events: ['change']
      },
      '.email': {
        observe: 'email',
        events: ['change']
      },
      '.key': 'key'
    },

    onRender: function() {
      this.stickit();
    },

    onDestroy: function() {
      this.unstickit();
    }

  });

});