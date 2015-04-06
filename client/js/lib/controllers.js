define(['marionette', 'layouts/stream'], function(Marionette, StreamLayout) {

  'use strict';

  return {

    stream: function() {
      Marionette.Radio.channel('render').command('layout', new StreamLayout());
    }

  };

});