define(['backbone', 'tpl', 'lib/fixHeights'], function(Backbone, tpl, fixHeights) {

  'use strict';

  return Backbone.View.extend({

    initialize: function() {
      this.model.on('change', this.render, this);
    },

    template: tpl.photo,

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

});
