define(['backbone', 'models/user'], function(Backbone, UserModel) {

  'use strict';

  return Backbone.Collection.extend({

    model: UserModel,

    url: '/api/v1/users',

    // A function to update individual models in the collection
    // if they've changed
    saveChanged: function() {
      this.forEach(function(user) {
        if(user.hasChanged()) {
          user.save();
        }
      });
    }

  });

});