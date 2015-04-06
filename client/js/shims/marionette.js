define(['underscore', 'marionette', 'backbone.radio'], function (_, Marionette, Radio) {

  // Shim Marionette to use Backbone.Radio instead of Backbone.Wreqr
  Marionette.Radio = Radio;

  Marionette.Application.prototype._initChannel = function () {
    this.channelName = _.result(this, 'channelName') || 'global';
    this.channel = _.result(this, 'channel') ||
    Radio.channel(this.channelName);
  };

  return Marionette;

});