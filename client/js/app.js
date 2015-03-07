require([
	'moment',
	'tpl',
	'models/photo',
	'views/count',
	'views/inspector',
	'views/downloads',
	'views/empty',
	'lib/fixHeights',
	'pnotify',
	'pnotify.desktop',
	'imagesLoaded'
], function(moment, Templates, Photo, PhotoCountView, InspectorView, DownloadsView, EmptyView, fixHeights, PNotify) {

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

		this.on("reset", function() {
			if(typeof window.inspectorView != 'undefined') {
				window.inspectorView.$el.html(window.inspectorView.empty);
			}
		});
	},
	comparator: function(photo) {
		var created = photo.get('created');
		return -moment(created).unix();
	},
	dump: function() {
		this.reset();
		socket.emit('dump', function(success) {
			if(success) {
				new PNotify({
					title: 'Database reset',
					text: 'The database is now empty. New photos will show as they arrive.',
					type: 'success',
					desktop: {
						desktop: true
					}
				});
			}
			else {
				new PNotify({
					title: 'Error dumping database',
					text: 'There was a problem dumping the photo database. Try refreshing your browser and try again.',
					type: 'error',
					desktop: {
						desktop: true
					}
				});
			}
		});
	}
});

var PhotoView = Backbone.View.extend({
	initialize: function() {
		this.template = Templates.photo;

		this.model.on("sync", function() {
			this.render();
			fixHeights();
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
		window.inspectorView = new InspectorView({
			model: this.model,
			el: $("#inspector")
		});
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var PhotostreamView = Backbone.View.extend({
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

		this.collection.on("reset", function() {
			this.render();
		}, this);
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
	},
	renderSingle: function(photo){
		var photoView = new PhotoView({model: photo});
		return photoView.render().el;
	}
});

$(function() {
	// Populate the Backbone collection and fire up the views
	window.photos = new Photos();
	window.photos.fetch({
		success: function() {
			var photostreamView = new PhotostreamView({
				collection: photos,
				el: $("#photos")
			});
			fixHeights(false);
			var downloadsView = new DownloadsView({
				collection: photos,
				el: $("#downloads")
			});
			var photoCountView = new PhotoCountView({
				collection: photos,
				el: $("#count")
			});
		}
	});
	// Re-layout images on window resize
	$(window).resize(_.debounce(function(){
		fixHeights(true);
	}, 500));
	// Setup desktop notifications
	var permissionsBox = $("#enable-notifications");
	if(PNotify.desktop.checkPermission()) {
		permissionsBox.on("click", "button", function() {
			PNotify.desktop.permission();
			permissionsBox.remove();
		});
	} else {
		permissionsBox.remove();
	}

	new EmptyView({
		el: '#confirm-delete',
		collection: window.photos,
		trigger: '#delete-photos'
	});
});

});
