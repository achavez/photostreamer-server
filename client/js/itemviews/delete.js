define(['marionette', 'tpl', 'bootstrap.modal'], function(Marionette, tpl) {

  'use strict';

  return Marionette.ItemView.extend({

    ui: {
      'delete': 'button.delete'
    },

    events: {
      'click @ui.delete': 'delete'
    },

    template: tpl['items.delete'],

    delete: function() {
      this.collection.dump();
    }

  });

});
