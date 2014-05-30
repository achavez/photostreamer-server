/* Fire up Websockets */
var socket = Backbone.io.connect();

/* Connection indicators, connection error handling */
socket.on("connect", function() {
	$(".disconnected").addClass("hidden");
	$(".connected").removeClass("hidden");
});
socket.on("disconnect", function() {
	$(".disconnected").removeClass("hidden");
	$(".connected").addClass("hidden");
	new PNotify({
		title: 'Server connection lost',
		text: 'New photos won\'t show and you won\'t be able to request photos until you\'re reconnected.',
		type: 'error',
		icon: 'glyphicon glyphicon-remove-circle',
		desktop: {
			desktop: true
		}
	});
});
socket.on("reconnect", function() {
	window.photos.fetch();
	new PNotify({
		title: 'Server connection restored',
		text: 'Everything should be back to normal.',
		type: 'success',
		icon: 'glyphicon glyphicon-ok-circle',
		desktop: {
			desktop: true
		}
	});
});

/* Backbone model stored in Mongo */
var Photo = Backbone.Model.extend({
	idAttribute: "_id",
	request: function() {
		this.save("requested", true, {wait: true});
	}
});

/* Backbone collection bound to Mongo using Backbone.io */
var Photos = Backbone.Collection.extend({
	model: Photo,
	backend: 'photos',
	initialize: function() {
		this.bindBackend();

		this.on("change", function(photo) {
			var changed = this.get(photo);
			changed.trigger("sync");

			if(photo.hasChanged('full')) {
				new PNotify({
					title: 'New download',
					text: photo.get('fileid') + ' available for download.',
					icon: 'glyphicon glyphicon-download-alt',
					desktop: {
						desktop: true
					}
				});			
			}
		});
	},
	comparator: function(photo) {
		var created = photo.get('created');
		return -moment(created).unix();
	}
});

var PhotoView = Backbone.View.extend({
	initialize: function() {
		this.template = Templates.photo;

		this.model.on("sync", function() {
			this.render();
		}, this);
	},
	className: 'photo col-xs-12 col-sm-6 col-md-4 col-lg-3',
	events: {
		"click .request-full": "request",
		"click .inspect": "inspect"
	},
	request: function() {
		this.model.request();
	},
	inspect: function() {
		window.inspectorView = new InspectorView({model: this.model});
		window.inspectorView.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var InspectorView = Backbone.View.extend({
	initialize: function() {
		this.template = Templates.inspector;

		this.model.on("sync", function() {
			this.render();
		}, this);
	},
	events: {
		"click .request-full": "request"
	},
	request: function() {
		this.model.request();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		$("#inspector").html(this.el);
	}
});

var PhotostreamView = Backbone.View.extend({
	initialize: function() {
		this.collection.on("add", function(photo) {
			var el = this.renderSingle(photo);
			this.$el.prepend(el);
			fixHeights(true);
		}, this);
	},
	render: function(){
		this.collection.forEach(function(photo) {
			var el = this.renderSingle(photo);
			this.$el.append(el);
		}, this);
		return this;
	},
	renderSingle: function(photo){
		var photoView = new PhotoView({model: photo});
		return photoView.render().el;
	}
});

var DownloadsView = Backbone.View.extend({
	initialize: function() {
		var source = $("#downloads-template").html();
		this.template = Templates.download;

		this.setElement(this.el);
		this.render();

		this.collection.on("add", function(download) {
			this.addSingle(download);
		}, this);

		this.collection.on("change", function(download) {
			if(download.hasChanged('full')) {
				this.addSingle(download);
			}
			else if(download.hasChanged('downloaded')) {
				this.render();
			}
		}, this);
	},
	addSingle: function(download) {
		var el = this.renderSingle(download);
		this.$el.prepend(el);
	},
	renderSingle: function(download) {
		return this.template(download.toJSON());
	},
	render: function() {
		this.$el.html('');
		this.collection.forEach(function(download) {
			if(download.get('full')) {
				this.$el.append(this.renderSingle(download));
			}
		}, this);
	}
});

/* Function to equalize panel heights for better readability    */
/* idea from http://css-tricks.com/equal-height-blocks-in-rows/ */
var fixHeights = function(reflow) {
	var currentTallest = 0, currentRowStart = 0,
	rowDivs = [], $el, topPosition = 0;
	var photos = $('#photos .photo');
	photos.imagesLoaded(function () {
		$("#photos").removeClass('loading');
		if(reflow) {
			photos.height('auto');
		}
		photos.each(function() {
			$el = $(this);
			topPostion = $el.position().top;
			if (currentRowStart != topPostion) {
				// we just came to a new row.  Set all the heights on the completed row
				for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
				// set the variables for the new row
				rowDivs.length = 0; // empty the array
				currentRowStart = topPostion;
				currentTallest = $el.height();
				rowDivs.push($el);
			} else {
				// another div on the current row.  Add it to the list and check if it's taller
				rowDivs.push($el);
				currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			}
			// do the last row
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
		});
	});
}

$(function() {
	// Populate the Backbone collection and fire up the views
	window.photos = new Photos();
	window.photos.fetch({
		success: function() {
			var photostreamView = new PhotostreamView({collection: photos});
			$('#photos').append(photostreamView.render().el);
			fixHeights(false);
			var downloadsView = new DownloadsView({collection: photos, el: $("#downloads")});
		}
	});
	// Re-layout images on window resize
	$(window).resize(_.debounce(function(){
		fixHeights(true);
	}, 500));
	// Setup desktop notifications
	var permissionButton = $("#enable-notifications");
	if(PNotify.desktop.checkPermission()) {
		permissionButton.click(function() {
			PNotify.desktop.permission();
			this.remove();
		});
	} else {
		permissionButton.remove();
	}
});