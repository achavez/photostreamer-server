require.config({
  paths: {
    backbone: '../../bower_components/backbone/backbone',
    marionette: '../../bower_components/marionette/lib/backbone.marionette',
    underscore: '../../bower_components/underscore/underscore',
    jquery: '../../bower_components/jquery/dist/jquery',
    handlebars: '../../bower_components/handlebars/handlebars',
    moment: '../../bower_components/momentjs/moment',
    filesize: '../../bower_components/filesize/lib/filesize',
    tpl: '../../build/templates',
    pnotify: '../../bower_components/pnotify/pnotify.core',
    'pnotify.desktop': '../../bower_components/pnotify/pnotify.desktop',
    'bootstrap.collapse': '../../bower_components/bootstrap/js/collapse',
    'bootstrap.transition': '../../bower_components/bootstrap/js/transition',
    'bootstrap.modal': '../../bower_components/bootstrap/js/modal'
  },
  shim: {
    'bootstrap.collapse': {
      deps: ['jquery', 'bootstrap.transition']
    },
    'bootstrap.modal': {
      deps: ['jquery']
    }
  },
  config: {
    moment: {
      noGlobal: true
    }
  }
});
