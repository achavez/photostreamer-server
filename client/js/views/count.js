define(function() {

  'use strict';

  // TODO: Don't use global Backbone
  return Backbone.View.extend({
    
    initialize: function() {
      this.setElement(this.el);
      this.render();

      this.collection.on("reset", function() {
        this.render();
      }, this);

      this.collection.on("add", function() {
        this.render();
      }, this);
    },

    render: function() {
      this.$el.text(this.collection.length);
    }

  });

});
