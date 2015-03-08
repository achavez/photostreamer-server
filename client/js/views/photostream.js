define(['views/photo', 'lib/fixHeights'], function(PhotoView, fixHeights) {

  'use strict';

  // TODO: Don't use global Backbone

  return Backbone.View.extend({
    initialize: function() {
      this.setElement(this.el);
      this.empty = this.$el.html();
      this.render();

      this.collection.on("add", function(photo) {
        // If this is the first photo to be streamed,
        // remove the empty text
        if(this.collection.length == 1) {
          this.$el.html('');
        }

        var el = this.renderSingle(photo);
        this.$el.prepend(el);
        fixHeights(true);
      }, this);

      this.collection.on("reset", this.render, this);

      // Re-layout images on window resize
      $(window).resize(_.debounce(function(){
        fixHeights(true);
      }, 500));
    },

    render: function(){
      if(this.collection.length > 0) {
        this.$el.html('');
        this.collection.forEach(function(photo) {
          var el = this.renderSingle(photo);
          this.$el.append(el);
        }, this);
      }
      else {
        this.$el.html(this.empty);
      }

      fixHeights(false);
    },

    renderSingle: function(photo){
      var photoView = new PhotoView({model: photo});
      return photoView.render().el;
    }

  });

})
