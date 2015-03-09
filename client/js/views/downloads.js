define(['tpl'], function(tpl) {

  'use strict';

  // TODO: Don't use global Backbone

  return Backbone.View.extend({

    initialize: function() {
      this.setElement(this.el);
      this.empty = this.$el.html();
      this.render();

      this.collection.on("change", function(download) {
        if(download.hasChanged('full')) {
          this.addSingle(download);
        }
        else if(download.hasChanged('downloaded')) {
          this.render();
        }
      }, this);

      this.collection.on("reset", function() {
        this.render();
      }, this);
    },

    template: tpl.download,

    addSingle: function(download) {
      var el = this.renderSingle(download);
      this.$el.prepend(el);
    },

    renderSingle: function(download) {
      return this.template(download.toJSON());
    },

    render: function() {
      var empty = true;
      var downloads;
      this.collection.forEach(function(download) {
        if(download.get('full')) {
          empty = false;
          downloads = downloads + this.renderSingle(download);
        }
      }, this);
      if(empty) {
        this.$el.html(this.empty);
      }
      else {
        this.$el.html(downloads);
      }
    }

  });

});
