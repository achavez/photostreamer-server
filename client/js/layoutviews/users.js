define([
  'marionette',
  'collectionviews/users',
  'itemviews/usersFormControls',
  'tpl'
  ], function(Marionette, UsersCollectionView, UsersFormControlsItemView, tpl) {

    'use strict';

    return Marionette.LayoutView.extend({

      initialize: function() {
        // Fetch the view data
        Marionette.Radio.channel('app').command('fetch', 'users');
      },

      onBeforeShow: function() {

        var users = Marionette.Radio
          .channel('app')
          .request('data', 'users');

        this.showChildView('list', new UsersCollectionView({
          collection: users
        }));

        this.showChildView('controls', new UsersFormControlsItemView({
          collection: users
        }));

      },

      destroyImmediate: true,

      template: tpl['layouts.users'],

      regions: {
        list: '#list',
        controls: '#controls'
      }

    });

  });