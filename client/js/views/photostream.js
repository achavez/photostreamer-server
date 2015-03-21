define(['backbone', 'views/photo'], function(Backbone, PhotoView) {

  'use strict';

  return Backbone.View.extend({
    initialize: function() {
      this.empty = this.$el.html();

      // Render on first fetch
      this.collection.once('sync', this.render, this);

      // Add new photos one at a time
      this.collection.on("add", function(photo) {
        // If this is the first photo to be streamed,
        // remove the empty text
        if(this.collection.length === 1) {
          this.$el.html('');
        }

        var el = this.renderSingle(photo);
        this.$el.prepend(el);
      }, this);

      // When the database is dumped and starts fresh
      this.collection.on('reset', this.render, this);
    },

    render: function(){
      this.$el.removeClass('loading');

      // If there are photos
      if(this.collection.length > 0) {
        this.$el.empty();
        this.collection.forEach(function(photo) {
          var el = this.renderSingle(photo);
          this.$el.append(el);
        }, this);
      }
      // Otherwise, show empty text
      else {
        this.$el.html(this.empty);
      }
    },

    renderSingle: function(photo){
      var photoView = new PhotoView({model: photo});
      return photoView.render().el;
    }

  });

});
