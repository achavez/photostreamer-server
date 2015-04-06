define([
  'marionette',
  'layoutviews/stream',
  'collectionviews/users',
  'itemviews/notFound'
], function(Marionette, StreamLayoutView, UsersCollectionView, NotFoundView) {

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
      this._radio.command('fetch', 'users');
      this._render(new UsersCollectionView({
        collection: this._radio.request('data', 'users')
      }), 'Users');
    },

    notFound: function() {
      this._render(new NotFoundView(), 'Page not found');
    }

  };

});