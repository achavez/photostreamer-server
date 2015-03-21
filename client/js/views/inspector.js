define(['tpl'], function(tpl) {

  // TODO: Don't use global Backbone

  'use strict';

  return Backbone.View.extend({

    initialize: function() {
      this.empty = this.$el.html();

      this.collection.on('inspect', this.render, this);
    },

    template: tpl.inspector,

    events: {
      "click .request-full": "request"
    },

    request: function() {
      this.inspecting.request();
    },

    // Listen for changes to the active model and stop listening when
    // the model changes
    activate: function(model) {
      // The inspector is being cleared
      if(model === null) {
        if(typeof this.inspecting !== "undefined") {
          this.inspecting.off('sync', this.render, this);
        }
        return;
      }

      // Unsubscribe before switching items because this isn't the first
      // to be inspected
      if(typeof this.inspecting !== "undefined") {
        this.inspecting.off('change', this.render, this);
      }

      this.inspecting = model;
      this.inspecting.on('change', this.render, this);
    },

    render: function(model) {
      this.activate(model);

      // If null is passed, revert to empty text
      if(model !== null) {
        this.$el.html(this.template(model.toJSON()));
      }
      else {
        this.$el.html(this.empty);
      }
    }

  });

});
