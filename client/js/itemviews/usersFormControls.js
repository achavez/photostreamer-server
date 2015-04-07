define(['marionette', 'tpl'], function(Marionette, tpl) {

  'use strict';

  return Marionette.ItemView.extend({

    ui: {
      save: '.form-save',
      reset: '.form-reset'
    },

    events: {
      'click @ui.save': 'save',
      'click @ui.reset': 'reset'
    },

    reset: function() {
      this.collection.fetch();
    },

    save: function() {
      this.collection.saveChanged();
    },

    template: tpl['items.usersFormControls']

  });

});