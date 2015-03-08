define(function() {

  // TODO: Don't use global Backbone

  'use strict';

  return Backbone.Model.extend({

    idAttribute: "_id",

    request: function() {
      this.save("requested", true, {wait: true});
    }

  });

});
