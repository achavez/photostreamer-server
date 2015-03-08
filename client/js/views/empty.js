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

      this.collection.on('dump:success', this.success, this);
      this.collection.on('dump:error', this.error, this);
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
    },

    success: function() {
      new PNotify({
        title: 'Database reset',
        text: 'The database is now empty. New photos will show as they arrive.',
        type: 'success',
        desktop: {
          desktop: true
        }
      });
    },

    error: function() {
      new PNotify({
        title: 'Error dumping database',
        text: 'There was a problem dumping the photo database. Try refreshing your browser and try again.',
        type: 'error',
        desktop: {
          desktop: true
        }
      });
    }

  });

});
