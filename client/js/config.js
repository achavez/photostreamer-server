require.config({
  paths: {
    backbone: '../../bower_components/backbone/backbone',
    'backbone.radio': '../../bower_components/backbone.radio/build/backbone.radio',
    'backbone.babysitter': '../../bower_components/backbone.babysitter/lib/backbone.babysitter',
    'backbone.stickit': '../../bower_components/backbone.stickit/backbone.stickit',
    'marionette': '../../bower_components/marionette/lib/core/backbone.marionette',
    underscore: '../../bower_components/underscore/underscore',
    jquery: '../../bower_components/jquery/dist/jquery',
    handlebars: '../../bower_components/handlebars/handlebars.runtime',
    moment: '../../bower_components/momentjs/moment',
    filesize: '../../bower_components/filesize/lib/filesize',
    tpl: '../../build/templates',
    pnotify: '../../bower_components/pnotify/pnotify.core',
    'pnotify.desktop': '../../bower_components/pnotify/pnotify.desktop',
    'bootstrap.collapse': '../../bower_components/bootstrap/js/collapse',
    'bootstrap.transition': '../../bower_components/bootstrap/js/transition',
    'bootstrap.modal': '../../bower_components/bootstrap/js/modal'
  },
  enforceDefine: true,
  shim: {
    'bootstrap.collapse': {
      deps: ['jquery', 'bootstrap.transition']
    },
    'bootstrap.modal': {
      deps: ['jquery']
    }
  },
  map: {
    // Shim Marionette to use backbone.wreqr instead of backbone.radio
    '*': {
      'marionette': 'shims/marionette',
      'backbone.wreqr': 'backbone.radio'
    },
    // But use the real marionette for our shim file, so we can inti
    // backbone.radio
    'shims/marionette': {
      'marionette': 'marionette'
    }
  },
  config: {
    moment: {
      noGlobal: true
    }
  }
});
