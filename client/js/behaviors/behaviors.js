define(['marionette', 'behaviors/usersave'], function(Marionette, UserSave) {

  'use strict';

  Marionette.Behaviors.behaviorsLookup = function() {
    return {
      UserSave: UserSave
    };
  };

});