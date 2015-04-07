define(['marionette', 'itemviews/user', 'tpl'], function(Marionette, UserItemView, tpl) {

  'use strict';

  return Marionette.CompositeView.extend({

    template: tpl['composites.users'],

    childView: UserItemView,

    childViewContainer: 'tbody'

  });

});