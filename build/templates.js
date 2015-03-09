define(['handlebars', '../templates/helpers'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["download"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "<i class=\"glyphicon glyphicon-ok text-success\"></i>";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<tr>\n	<td>";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.downloaded : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</td>\n	<td>"
    + escapeExpression(((helper = (helper = helpers.fileid || (depth0 != null ? depth0.fileid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"fileid","hash":{},"data":data}) : helper)))
    + "</td>\n	<td>"
    + escapeExpression(((helpers.fsize || (depth0 && depth0.fsize) || helperMissing).call(depth0, (depth0 != null ? depth0.filesize : depth0), {"name":"fsize","hash":{},"data":data})))
    + "</td>\n	<td>\n		<a href=\"/download/"
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n			<button type=\"button\" class=\"btn btn-primary btn-xs\"><i class=\"glyphicon glyphicon-download-alt\"></i></button>\n		</a>\n	</td>\n</tr>";
},"useData":true});

this["JST"]["inspector"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "		<strong>Full file URL</strong> <a href=\""
    + escapeExpression(((helper = (helper = helpers.full || (depth0 != null ? depth0.full : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"full","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.full || (depth0 != null ? depth0.full : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"full","hash":{},"data":data}) : helper)))
    + "</a></br>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "		<h3>Metadata</h3>\n		";
  stack1 = ((helpers.exif || (depth0 && depth0.exif) || helperMissing).call(depth0, (depth0 != null ? depth0.exif : depth0), {"name":"exif","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n";
},"4":function(depth0,helpers,partials,data) {
  return "";
},"6":function(depth0,helpers,partials,data) {
  return "	<button type=\"button\" class=\"btn btn-primary request-full\"><i class=\"glyphicon glyphicon-import\"></i> Request file</button>\n";
  },"8":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "	<a href=\"/download/"
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.downloaded : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "	</a>\n";
},"9":function(depth0,helpers,partials,data) {
  return "			<button type=\"button\" class=\"btn btn-primary download\"><i class=\"glyphicon glyphicon-saved\"></i> Redownload</button>\n";
  },"11":function(depth0,helpers,partials,data) {
  return "			<button type=\"button\" class=\"btn btn-primary download\"><i class=\"glyphicon glyphicon-download-alt\"></i> Download</button>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<p>\n	<img class=\"img-responsive\" src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" />\n</p>\n<p>\n	<strong>File ID</strong> "
    + escapeExpression(((helper = (helper = helpers.fileid || (depth0 != null ? depth0.fileid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"fileid","hash":{},"data":data}) : helper)))
    + "</br>\n	<strong>Thumbnail URL</strong> <a href=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "</a></br>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.full : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "	<strong>Time created</strong> "
    + escapeExpression(((helpers.date || (depth0 && depth0.date) || helperMissing).call(depth0, (depth0 != null ? depth0.created : depth0), "h:mma", {"name":"date","hash":{},"data":data})))
    + "</br>\n	<strong>Date created</strong> "
    + escapeExpression(((helpers.date || (depth0 && depth0.date) || helperMissing).call(depth0, (depth0 != null ? depth0.created : depth0), "MMMM D, YYYY", {"name":"date","hash":{},"data":data})))
    + "</br>\n	<strong>Filesize</strong> "
    + escapeExpression(((helpers.fsize || (depth0 && depth0.fsize) || helperMissing).call(depth0, (depth0 != null ? depth0.filesize : depth0), {"name":"fsize","hash":{},"data":data})))
    + "</br>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.exif : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "</p>\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.requested : depth0), {"name":"unless","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.full : depth0), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});

this["JST"]["photo"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
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
    + "</small></br>\n		</p>\n		<div class=\"btn-group btn-group-xs\">\n";
  stack1 = helpers.unless.call(depth0, (depth0 != null ? depth0.requested : depth0), {"name":"unless","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.full : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "			<button type=\"button\" class=\"inspect btn btn-default\"><i class=\"glyphicon glyphicon-zoom-in\"></i> Inspect</button>\n		</div>\n	</div>\n</div>";
},"useData":true});

return this["JST"];

});