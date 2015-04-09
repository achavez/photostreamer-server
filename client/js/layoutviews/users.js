define([
  'marionette',
  'models/user',
  'compositeviews/users',
  'itemviews/newUser',
  'tpl'
  ], function(Marionette, UserModel, UsersCompositeView, NewUserItemView, tpl) {

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

        this.newUser();
      },

      childEvents: {
        'user:new': 'newUser'
      },

      newUser: function() {
        var users = Marionette.Radio
          .channel('app')
          .request('data', 'users');

        var newUser = new NewUserItemView({
          model: new UserModel(),
          collection: users
        });

        this.showChildView('new', newUser);
      },

      destroyImmediate: true,

      template: tpl['layouts.users'],

      regions: {
        list: '#list',
        new: '#new'
      }

    });

  });