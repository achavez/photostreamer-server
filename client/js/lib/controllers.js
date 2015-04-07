define([
  'marionette',
  'layoutviews/stream',
  'layoutviews/users',
  'itemviews/notFound'
], function(Marionette, StreamLayoutView, UsersLayoutView, NotFoundView) {

  'use strict';

  return {

    _radio: Marionette.Radio.channel('app'),

    // Render a page by radioing to the app with a view and a page title
    _render: function(view, title) {
      this._radio.command('render', view, title);
    },

    stream: function() {
      this._render(new StreamLayoutView(), 'Photos');
    },

    users: function() {
      this._render(new UsersLayoutView(), 'Users');
    },

    notFound: function() {
      this._render(new NotFoundView(), 'Page not found');
    }

  };

});