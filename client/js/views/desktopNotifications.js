define(['marionette', 'tpl', 'pnotify', 'pnotify.desktop'], function(Marionette, tpl, PNotify) {

  'use strict';

  return Marionette.View.extend({

    ui: {
      'button': '.btn'
    },

    events: {
      'click @ui.button': 'enable'
    },

    enable: function() {
      PNotify.desktop.permission();
      this.destroy();
    },

    template: tpl.desktopNotifications,

    render: function() {
      if(PNotify.desktop.checkPermission()) {
        this.$el.html(this.template());
      }
    }

  });

});