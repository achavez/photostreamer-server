define(['marionette', 'lib/controllers'], function(Marionette, controllers) {

  'use strict';

  return Marionette.AppRouter.extend({

    appRoutes: {
      '': 'stream'
    },

    controller: controllers,

    onRoute: function(name, path, args) {
      console.log(name, path, args);
    }

  });

});