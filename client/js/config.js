require.config({
  paths: {
//    backbone: '../../bower_components/backbone/backbone',
//    underscore: '../../bower_components/underscore/underscore',
    jquery: '../../bower_components/jquery/dist/jquery',
    imagesLoaded: '../../bower_components/imagesloaded/imagesloaded.pkgd',
    handlebars: '../../bower_components/handlebars/handlebars',
    moment: '../../bower_components/momentjs/moment',
    filesize: '../../bower_components/filesize/lib/filesize',
    tpl: '../../build/templates',
    pnotify: '../../bower_components/pnotify/pnotify.core',
    'pnotify.desktop': '../../bower_components/pnotify/pnotify.desktop',
    'bootstrap.collapse': '../../bower_components/bootstrap/js/collapse',
    'bootstrap.transition': '../../bower_components/bootstrap/js/transition',
  },
  shim: {
    handlebars: {
      exports: 'Handlebars'
    },
    imagesLoaded: {
      deps: ['jquery'],
      exports: 'jQuery.fn.imagesLoaded'
    },
    filesize: {
      exports: 'filesize'
    },
    'bootstrap.collapse': {
      deps: ['jquery', 'bootstrap.transition']
    }
  },
  config: {
    moment: {
      noGlobal: true
    }
  }
});
