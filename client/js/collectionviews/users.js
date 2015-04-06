define(['marionette', 'itemviews/user'], function(Marionette, UserItemView) {

  'use strict';

  return Marionette.CollectionView.extend({

    tagName: 'form',

    className: 'row',

    childView: UserItemView

  });

});