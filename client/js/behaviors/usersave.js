define(['marionette'], function(Marionette) {

  'use strict';

  return Marionette.Behavior.extend({

    ui: {
      save: '.save'
    },

    events: {
      'click @ui.save': 'save',
      'keyup input': 'enableSave'
    },

    enableSave: function() {
      this.$('.save')
        .attr('disabled', null);
    },

    save: function() {
      this.$('input')
        .attr('disabled', 'disabled');

      this.$('.save')
        .attr('disabled', 'disabled')
        .find('.text')
        .text('Saving ...');

      if(this.view.model.isNew()) {
        this.view.collection.add(this.view.model);
      }
      this.view.model.save({ wait: true });
      this.view.listenToOnce(this.view.model, 'sync', this.view._saved);
    }

  });

});