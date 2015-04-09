define(['marionette', 'tpl', 'itemviews/user', 'backbone.stickit'], function(Marionette, tpl, UserItemView) {

  'use strict';

  return Marionette.ItemView.extend({

    template: tpl['items.newUser'],

    tagName: 'table',

    className: 'table',

    behaviors: {
      // This brings in all the logic to handle saving and
      // enabling/disabling form inputs
      UserSave: {}
    },

    // Set the view back to its original state when
    // saving has finished
    _saved: function() {
      this.triggerMethod('user:new');
    },

    /* ~ Config for backbone.stickit ~ */

    // Use backbone.stickit to bind the view and model data
    bindings: {
      '.name': {
        observe: 'name',
        events: ['change', 'keyup']
      },
      '.email': {
        observe: 'email',
        events: ['change', 'keyup']
      }
    },

    onRender: function() {
      this.stickit();
    },

    onDestroy: function() {
      this.unstickit();
    }

  });

});