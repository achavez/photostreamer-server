define(['tpl'], function(tpl) {

  'use strict';

  // TODO: Don't use global Backbone

  return Backbone.View.extend({

    initialize: function() {
      this.empty = this.$el.html();

      // Render after the first fetch and on resets
      this.collection.once('sync', this.render, this);
      this.collection.on('reset', this.render, this);

      // Re-render every time a download becomes available
      this.collection.on('change', function(download) {
        if(download.hasChanged('full') || download.hasChanged('downloaded')) {
          this.render();
        }
      }, this);
    },

    template: tpl.download,

    // Render a row for each photo with an available download
    render: function() {
      var el = this.collection.chain()
        .filter(function(photo) {
          return photo.has('full');
        })
        .reduce(function(memo, download) {
          return memo + this.template(download.toJSON());
        }, '', this)
        .value();

      // Use the empty text if there are no downloads available
      // (like after a DB dump)
      if(el !== '') {
        this.$el.html(el);
      }
      else {
        this.$el.html(this.empty);
      }
    }

  });

});
