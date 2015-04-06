define(['marionette', 'lib/controllers'], function(Marionette, controllers) {

  'use strict';

  return Marionette.AppRouter.extend({

    appRoutes: {
      '': 'stream',
      'users': 'users'
    },

    controller: controllers

  });

});