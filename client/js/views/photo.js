define(['tpl', 'lib/fixHeights'], function(Templates, fixHeights) {

  'use strict';

  // TODO: Don't use global Backbone

  return Backbone.View.extend({

    initialize: function() {
      this.template = Templates.photo;

      this.model.on("sync", function() {
        this.render();
        fixHeights();
      }, this);
    },

    className: 'photo col-xs-12 col-sm-6 col-md-4 col-lg-3',

    events: {
      "click .request-full": "request",
      "click .inspect": "inspect"
    },

    request: function() {
      this.model.request();
    },

    inspect: function() {
      this.model.collection.inspect(this.model);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

})
