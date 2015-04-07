define(['backbone', 'models/user'], function(Backbone, UserModel) {

  'use strict';

  return Backbone.Collection.extend({

    model: UserModel,

    url: '/api/v1/users'

  });

});