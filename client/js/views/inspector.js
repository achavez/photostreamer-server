define(['backbone', 'tpl'], function(Backbone, tpl) {

  'use strict';

  return Backbone.View.extend({

    initialize: function() {
      this.empty = this.$el.html();

      this.collection.on('inspect', this.render, this);
      this.collection.on('reset', this.clear, this);
    },

    template: tpl.inspector,

    events: {
      "click .request-full": "request"
    },

    request: function() {
      this.inspecting.request();
    },

    // Unsubscribe before switching items in the inspector
    _unsubscribe: function() {
      if(typeof this.inspecting !== "undefined") {
        this.inspecting.off('change', this.render, this);
      }
    },

    // Clear the inspector when the collection is reset
    clear: function() {
      this._unsubscribe();
      this.$el.html(this.empty);
    },

    // Listen for changes to the active model and stop listening when
    // the model changes
    activate: function(model) {
      this._unsubscribe();

      this.inspecting = model;
      this.inspecting.on('change', this.render, this);
    },

    render: function(model) {
      this.activate(model);

      this.$el.html(this.template(model.toJSON()));
    }

  });

});
