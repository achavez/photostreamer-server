define(['marionette', 'tpl', 'backbone.stickit'], function(Marionette, tpl) {

  'use strict';

  return Marionette.ItemView.extend({

    template: tpl['items.user'],

    tagName: 'tr',

    ui: {
      save: '.save'
    },

    events: {
      'click @ui.save': 'save'
    },

    // Disable the form and tweak the button text, then save
    // using HTTP API
    save: function() {
      this.$('input')
        .attr('disabled', 'disabled');

      this.$('.save')
        .attr('disabled', 'disabled')
        .find('.text')
        .text('Saving ...');

      this.model.save({ wait: true });
      this.listenToOnce(this.model, 'sync', this._saved);
    },

    // Set the view back to its original state when
    // saving has finished
    _saved: function() {
      this.$('input')
        .attr('disabled', null);

      this.$('.save')
        .attr('disabled', null)
        .find('.text')
        .text('Save');
    },

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
      // Only setup backbone.stickit if there's a model present,
      // which allows us to also use this view as a new user form
      if(this.hasOwnProperty('model')) {
        this.stickit();
      }
    },

    onDestroy: function() {
      this.unstickit();
    }

  });

});