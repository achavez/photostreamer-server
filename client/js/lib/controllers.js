define(['marionette', 'layoutviews/stream', 'itemviews/notFound'], function(Marionette, StreamLayoutView, NotFoundView) {

  'use strict';

  return {

    // Render a page by radioing to the app with a view and a page title
    _render: function(view, title) {
      Marionette.Radio.channel('app').command('render', view, title);
    },

    stream: function() {
      this._render(new StreamLayoutView(), 'Photos');
    },

    notFound: function() {
      this._render(new NotFoundView(), 'Page not found');
    }

  };

});