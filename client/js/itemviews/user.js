define(['marionette', 'tpl', 'backbone.stickit', 'behaviors/behaviors', 'bootstrap.modal'], function(Marionette, tpl) {

  'use strict';

  return Marionette.ItemView.extend({

    template: tpl['items.user'],

    tagName: 'tr',

    behaviors: {
      // This brings in all the logic to handle saving and
      // enabling/disabling form inputs
      UserSave: {}
    },

    // Set the view back to its original state when
    // saving has finished. This is called from the UserSave
    // behavior.
    _saved: function() {
      this.$('input')
        .attr('disabled', null);

      this.$('.save')
        .attr('disabled', 'disabled')
        .find('.text')
        .text('Save');
    },

    /* ~ Handle user deletion ~ */

    ui: {
      'delete': '.delete'
    },

    events: {
      'click @ui.delete': 'delete'
    },

    delete: function() {
      // Disable all form elements
      this.$('input').attr('disabled', 'disabled');
      this.$('button').attr('disabled', 'disabled');

      // Close the modal and wait for it to finish hiding
      // before destroying the model; if we don't, the
      // .modal-open class may linger on the <body>
      this.$('.modal').modal('hide');
      this.$('.modal').on('hidden.bs.modal', function() {

        // Destroy the model, deferring the collection update
        // until the DELETE has returned
        this.model.destroy({ wait: true });

      }.bind(this));
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
      },
      '.key': 'key'
    },

    onRender: function() {
      this.stickit();
    },

    onDestroy: function() {
      this.unstickit();
      this.$('.modal').off('hidden.bs.modal');
    }

  });

});