define(['backbone'], function(Backbone) {

  'use strict';

  return Backbone.View.extend({

    initialize: function() {
      this.collection.once('sync', this.render, this);
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.render, this);
    },

    render: function() {
      this.$el.text(this.collection.length);
    }

  });

});
