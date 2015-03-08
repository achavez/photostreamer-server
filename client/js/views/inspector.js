define(['tpl'], function(tpl) {

  // TODO: Don't use global Backbone

  'use strict';

  return Backbone.View.extend({

    initialize: function() {
      this.setElement(this.el);
      this.empty = this.$el.html();
      this.render();

      this.model.on("sync", function() {
        this.render();
      }, this);
    },

    template: tpl.inspector,

    events: {
      "click .request-full": "request"
    },

    request: function() {
      this.model.request();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }

  });

})
