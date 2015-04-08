define(['handlebars', '../templates/helpers'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["composites.users"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<table class=\"table\" id=\"list\">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Email</th>\n      <th>API Key</th>\n      <th></th>\n    </tr>\n  </thead>\n  <tbody></tbody>\n</table>";
  },"useData":true});

this["JST"]["desktopNotifications"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<button type=\"button\" class=\"btn btn-primary btn-block\"><i class=\"glyphicon glyphicon-comment\"></i> Enable desktop notifications</button>\n<p class=\"text-center\">\n  <small>Requires a <a href=\"http://caniuse.com/notifications\" target=\"_blank\">modern Web browser</a>.</small>\n</p>";
  },"useData":true});

this["JST"]["emptys.downloads"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h3 class=\"panel-title\">Available downloads</h3>\n	</div>\n	<div class=\"panel-body\">\n		<table class=\"table table-condensed\">\n			<thead>\n				<tr>\n					<th></th>\n					<th>File ID</th>\n					<th>Filesize</th>\n					<th></th>\n				</tr>\n			</thead>\n			<tbody>\n				<tr>\n					<td colspan=\"4\">There aren't any photos available for download yet.</td>\n				</tr>\n			</tbody>\n		</table>\n	</div>\n</div>\n";
  },"useData":true});

this["JST"]["emptys.photostream"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"col-xs-12\">\n  <div class=\"jumbotron\">\n    <h1><small><i class=\"glyphicon glyphicon-picture\"></i></small> No photos</h1>\n    <p>Photos will show here as soon as they arrive.</p>\n  </div>\n</div>";
  },"useData":true});

this["JST"]["items.connection"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "  <span class=\"label label-success\">\n    <i class=\"glyphicon glyphicon-ok-circle\"></i> Connected\n  </span>\n";
  },"3":function(depth0,helpers,partials,data) {
  return "  <span class=\"label label-danger\">\n    <i class=\"glyphicon glyphicon-remove-circle\"></i> Can't connect to server\n  </span>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.connected : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});

this["JST"]["items.delete"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<button type=\"button\" class=\"btn btn-danger btn-block\" data-toggle=\"modal\" data-target=\"#delete-confirm\">\n  <i class=\"glyphicon glyphicon-trash\"></i> Empty photo database\n</button>\n\n<div class=\"modal fade\" id=\"delete-confirm\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">Are you sure you want to empty the database?</h4>\n      </div>\n      <div class=\"modal-body\">\n        <p>Emptying the database won't actually delete the files from the server where they're stored, it'll just delete them from this viewer app.</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n        <button type=\"button\" class=\"btn btn-danger delete\" data-dismiss=\"modal\"><i class=\"glyphicon glyphicon-trash\"></i> Empty the database</button>\n      </div>\n    </div>\n  </div>\n</div>\n";
  },"useData":true});

this["JST"]["items.download"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "<i class=\"glyphicon glyphicon-ok text-success\"></i>";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<td>";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.downloaded : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</td>\n<td>"
    + escapeExpression(((helper = (helper = helpers.fileid || (depth0 != null ? depth0.fileid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"fileid","hash":{},"data":data}) : helper)))
    + "</td>\n<td>"
    + escapeExpression(((helpers.fsize || (depth0 && depth0.fsize) || helperMissing).call(depth0, (depth0 != null ? depth0.filesize : depth0), {"name":"fsize","hash":{},"data":data})))
    + "</td>\n<td>\n  <a href=\"/download/"
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n    <button type=\"button\" class=\"btn btn-primary btn-xs\"><i class=\"glyphicon glyphicon-download-alt\"></i></button>\n  </a>\n</td>";
},"useData":true});

this["JST"]["items.inspector"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "			<p>\n				<img class=\"img-responsive\" src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" />\n			</p>\n			<p>\n				<strong>File ID</strong> "
    + escapeExpression(((helper = (helper = helpers.fileid || (depth0 != null ? depth0.fileid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"fileid","hash":{},"data":data}) : helper)))
    + "</br>\n				<strong>Thumbnail URL</strong> <a href=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "</a></br>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.full : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "				<strong>Time created</strong> "
    + escapeExpression(((helpers.date || (depth0 && depth0.date) || helperMissing).call(depth0, (depth0 != null ? depth0.created : depth0), "h:mma", {"name":"date","hash":{},"data":data})))
    + "</br>\n				<strong>Date created</strong> "
    + escapeExpression(((helpers.date || (depth0 && depth0.date) || helperMissing).call(depth0, (depth0 != null ? depth0.created : depth0), "MMMM D, YYYY", {"name":"date","hash":{},"data":data})))
    + "</br>\n				<strong>Filesize</strong> "
    + escapeExpression(((helpers.fsize || (depth0 && depth0.fsize) || helperMissing).call(depth0, (depth0 != null ? depth0.filesize : depth0), {"name":"fsize","hash":{},"data":data})))
    + "</br>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.exif : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "			</p>\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.requested : depth0), {"name":"unless","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.full : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "				<strong>Full file URL</strong> <a href=\""
    + escapeExpression(((helper = (helper = helpers.full || (depth0 != null ? depth0.full : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"full","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.full || (depth0 != null ? depth0.full : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"full","hash":{},"data":data}) : helper)))
    + "</a></br>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "				<h3>Metadata</h3>\n				";
  stack1 = ((helpers.exif || (depth0 && depth0.exif) || helperMissing).call(depth0, (depth0 != null ? depth0.exif : depth0), {"name":"exif","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"5":function(depth0,helpers,partials,data) {
  return "";
},"7":function(depth0,helpers,partials,data) {
  return "			<button type=\"button\" class=\"btn btn-primary request-full\"><i class=\"glyphicon glyphicon-import\"></i> Request file</button>\n";
  },"9":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "			<a href=\"/download/"
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.downloaded : depth0), {"name":"if","hash":{},"fn":this.program(10, data),"inverse":this.program(12, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "			</a>\n";
},"10":function(depth0,helpers,partials,data) {
  return "				<button type=\"button\" class=\"btn btn-primary download\"><i class=\"glyphicon glyphicon-saved\"></i> Redownload</button>\n";
  },"12":function(depth0,helpers,partials,data) {
  return "				<button type=\"button\" class=\"btn btn-primary download\"><i class=\"glyphicon glyphicon-download-alt\"></i> Download</button>\n";
  },"14":function(depth0,helpers,partials,data) {
  return "			<p>Click <button type=\"button\" class=\"inspect btn btn-default btn-xs\"><i class=\"glyphicon glyphicon-zoom-in\"></i> Inspect</button> on a photo to open it here.</p>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"panel panel-default\">\n	<div class=\"panel-heading\">\n		<h3 class=\"panel-title\">Inspector</h3>\n	</div>\n	<div class=\"panel-body\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0._id : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(14, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	</div>\n</div>";
},"useData":true});

this["JST"]["items.notFound"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"alert alert-danger\" role=\"alert\"><span class=\"glyphicon glyphicon-alert\"></span> The page you're looking for can't be found. If you think this is a result of a bug in the application, please <a href=\"https://github.com/achavez/photostreamer-server/issues/new\" target=\"_blank\">file an issue</a> on Github.</div>";
  },"useData":true});

this["JST"]["items.photo"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "				<button type=\"button\" class=\"btn btn-default request-full\"><i class=\"glyphicon glyphicon-import\"></i> Request</button>\n";
  },"3":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "				<a href=\"/download/"
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.downloaded : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "				</a>\n";
},"4":function(depth0,helpers,partials,data) {
  return "						<button type=\"button\" class=\"btn btn-default btn-xs\"><i class=\"glyphicon glyphicon-saved\"></i> Redownload</button>\n";
  },"6":function(depth0,helpers,partials,data) {
  return "						<button type=\"button\" class=\"btn btn-default btn-xs\"><i class=\"glyphicon glyphicon-download-alt\"></i> Download</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"panel panel-default\">\n	<div class=\"panel-body\">\n		<p>\n			<img class=\"img-responsive\" src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" />\n		</p>\n		<p>\n			<small><strong>Created</strong> "
    + escapeExpression(((helpers.date || (depth0 && depth0.date) || helperMissing).call(depth0, (depth0 != null ? depth0.created : depth0), "h:mm:ssa M/D/YY", {"name":"date","hash":{},"data":data})))
    + "</small></br>\n			<small><strong>Filesize</strong> "
    + escapeExpression(((helpers.fsize || (depth0 && depth0.fsize) || helperMissing).call(depth0, (depth0 != null ? depth0.filesize : depth0), {"name":"fsize","hash":{},"data":data})))
    + "</small>\n		</p>\n		<div class=\"btn-group btn-group-xs\">\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.requested : depth0), {"name":"unless","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.full : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "			<button type=\"button\" class=\"inspect btn btn-default\"><i class=\"glyphicon glyphicon-zoom-in\"></i> Inspect</button>\n		</div>\n	</div>\n</div>";
},"useData":true});

this["JST"]["items.user"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <input class=\"form-control key\" type=\"text\" value=\""
    + escapeExpression(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"key","hash":{},"data":data}) : helper)))
    + "\" readonly>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<td>\n  <input class=\"form-control name\" type=\"text\" placeholder=\"Name\" value=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n</td>\n<td>\n  <input class=\"form-control email\" type=\"email\" placeholder=\"Email address\" value=\""
    + escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"email","hash":{},"data":data}) : helper)))
    + "\">\n</td>\n<td>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.key : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</td>\n<td>\n  <div class=\"btn-group\" role=\"group\">\n    <button type=\"button\" class=\"btn btn-primary save\" disabled=\"disabled\"><span class=\"glyphicon glyphicon-floppy-disk\"></span> <span class=\"text\">Save</span></button>\n  </div>\n</td>";
},"useData":true});

this["JST"]["layouts.stream"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"row\">\n  <div class=\"col-xs-12 col-sm-4 col-sm-push-8\">\n    <div id=\"desktop-notifications\"></div>\n    <div id=\"inspector\"></div>\n    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">\n        <h3 class=\"panel-title\">Available downloads</h3>\n      </div>\n      <div id=\"downloads\" class=\"panel-body\"></div>\n    </div>\n    <div id=\"delete\"></div>\n  </div>\n  <div id=\"stream\" class=\"col-xs-12 col-sm-8 col-sm-pull-4\"></div>\n</div>";
  },"useData":true});

this["JST"]["layouts.users"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<table class=\"table\" id=\"list\"></table>\n\n<div id=\"controls\"></div>\n<div id=\"new\"></div>";
  },"useData":true});

return this["JST"];

});