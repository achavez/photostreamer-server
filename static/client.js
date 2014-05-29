var socket = Backbone.io.connect();

/* Connection indicators, error handling */
socket.on("connect", function() {
	$(".disconnected").addClass("hidden");
	$(".connected").removeClass("hidden");
});
socket.on("disconnect", function() {
	$(".disconnected").removeClass("hidden");
	$(".connected").addClass("hidden");
});
socket.on("reconnect", function() {
	window.photos.fetch();
});

function throwAlert(type, msg) {
	var source = $("#alert-template").html();
	var alertTemplate = Handlebars.compile(source);
	$("#alert").html(alertTemplate({type: type, message: msg}));
};

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
		});
	},
	comparator: function(photo) {
		var created = photo.get('created');
		return -moment(created).unix();
	}
});

var PhotoView = Backbone.View.extend({
	initialize: function() {
		var source = $("#photo-template").html();
		this.template = Handlebars.compile(source);

		this.model.on("sync", function() {
			this.render();
		}, this);
	},
	className: 'col-xs-12 col-sm-6 col-md-4 col-lg-3',
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
		var source = $("#inspector-template").html();
		this.template = Handlebars.compile(source);

		this.model.on("sync", function() {
			this.render();
		}, this);
	},
	events: {
		"click button": "request"
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
		this.template = Handlebars.compile(source);

		this.setElement(this.el);
		this.render();

		this.collection.on("add", function(download) {
			this.addSingle(download);
		}, this);

		this.collection.on("change", function(download) {
			if(download.hasChanged('full')) {
				this.addSingle(download);
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

$(function() {
	window.photos = new Photos();
	window.photos.fetch({
		success: function() {
			var photostreamView = new PhotostreamView({collection: photos});
			$('#photos').append(photostreamView.render().el);
			var downloadsView = new DownloadsView({collection: photos, el: $("#downloads")});
		}
	});
	// Register Handlebars helpfer to format dates ...
	Handlebars.registerHelper('date', function(time, format) {
		var time = moment(time);
		var result = '<time datetime="' + time.toISOString() + '">' + time.format(format) + '</time>';
		return new Handlebars.SafeString(result);
	});
	// and another to format file sizes
	Handlebars.registerHelper('fsize', function(bytes) {
		return new Handlebars.SafeString(filesize(bytes));
	});
});