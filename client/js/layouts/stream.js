define(['marionette', 'tpl'], function(Marionette, tpl) {

  'use strict';

  return Marionette.LayoutView.extend({

    el: '#main',

    template: tpl.stream,

    regions: {
      notifications: '#desktop-notifications',
      stream: '#stream',
      inspector: '#inspector',
      downloads: '#downloads',
      delete: '#delete'
    }

  });

});