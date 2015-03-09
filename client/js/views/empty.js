define(function() {

  'use strict';

  // TODO: Don't use global Backbone

  /*
   * Empty database trigger
   *
   * This Backbone View is the UI element to empty the Mongo
   * database. $trigger is the button that starts the process.
   * The bound element is the confirmation prompt.
   */

  return Backbone.View.extend({

    initialize: function(options) {
      this.$trigger = $(options.trigger);
      this.$trigger.on('click', this.prompt.bind(this));
    },

    events: {
      'click .cancel': 'cancel',
      'click .confirm': 'confirm'
    },

    prompt: function() {
      this.$el.removeClass("hidden");
    },

    cancel: function() {
      this.$el.addClass("hidden");
    },

    confirm: function() {
      this.collection.dump();
      this.$el.addClass("hidden");
    }

  });

});
