define([
  'marionette',
  'compositeviews/users',
  'itemviews/user',
  'tpl'
  ], function(Marionette, UsersCompositeView, UserItemView, tpl) {

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

        this.showChildView('list', new UsersCompositeView({
          collection: users
        }));

        this.showChildView('new', new UserItemView());

      },

      destroyImmediate: true,

      template: tpl['layouts.users'],

      regions: {
        list: '#list',
        controls: '#controls',
        new: '#new'
      }

    });

  });