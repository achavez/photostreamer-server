Backbone.io.connect();

/* Backbone model stored in Mongo */
var Photo = Backbone.Model.extend({
	idAttribute: "_id",
	request: function() {
		this.set({requested: true});
		this.save();
	}
});

/* Backbone collection bound to Mongo using Backbone.io */
var Photos = Backbone.Collection.extend({
	model: Photo,
	backend: 'photos',
	initialize: function() {
		this.bindBackend();
	}
});

var PhotoView = Backbone.View.extend({
	initialize: function() {
		var source = $("#photo-template").html();
		this.template = Handlebars.compile(source);
	},
	className: 'col-xs-12 col-sm-6 col-md-4 col-lg-3',
	events: {
		"click .request-full": "request",
		"click .inspect": "inspect"
	},
	request: function() {
		this.model.request();
		this.render();
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
	},
	render: function() {
		$("#inspector").html(this.template(this.model.toJSON()));
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

$(function() {
	window.photos = new Photos();
	window.photos.fetch({
		success: function() {
			var view = new PhotostreamView({collection: photos});
			$('#photos').append(view.render().el);
		}
	});
	// Register Handlebars helpfer to format dates
	Handlebars.registerHelper('date', function(time, format) {
		var time = moment(time)
		var result = '<time datetime="' + time.toISOString() + '">' + time.format(format) + '</time>';
		return new Handlebars.SafeString(result);
	});
});