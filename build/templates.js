define(['handlebars', '../templates/helpers'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["download"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "<i class=\"glyphicon glyphicon-ok text-success\"></i>";
  }

  buffer += "<tr>\n	<td>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.downloaded), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n	<td>";
  if (helper = helpers.fileid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fileid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n	<td>"
    + escapeExpression((helper = helpers.fsize || (depth0 && depth0.fsize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.filesize), options) : helperMissing.call(depth0, "fsize", (depth0 && depth0.filesize), options)))
    + "</td>\n	<td>\n		<a href=\"/download/";
  if (helper = helpers._id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0._id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n			<button type=\"button\" class=\"btn btn-primary btn-xs\"><i class=\"glyphicon glyphicon-download-alt\"></i></button>\n		</a>\n	</td>\n</tr>";
  return buffer;
  });

this["JST"]["inspector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n		<strong>Full file URL</strong> <a href=\"";
  if (helper = helpers.full) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.full); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">";
  if (helper = helpers.full) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.full); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></br>\n	";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n		<h3>Metadata</h3>\n		";
  stack1 = (helper = helpers.exif || (depth0 && depth0.exif),options={hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.exif), options) : helperMissing.call(depth0, "exif", (depth0 && depth0.exif), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "\n	<button type=\"button\" class=\"btn btn-primary request-full\"><i class=\"glyphicon glyphicon-import\"></i> Request file</button>\n";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n	<a href=\"/download/";
  if (helper = helpers._id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0._id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.downloaded), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</a>\n";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "\n			<button type=\"button\" class=\"btn btn-primary download\"><i class=\"glyphicon glyphicon-saved\"></i> Redownload</button>\n		";
  }

function program11(depth0,data) {
  
  
  return "\n			<button type=\"button\" class=\"btn btn-primary download\"><i class=\"glyphicon glyphicon-download-alt\"></i> Download</button>\n		";
  }

  buffer += "<p>\n	<img class=\"img-responsive\" src=\"";
  if (helper = helpers.thumbnail) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.thumbnail); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n</p>\n<p>\n	<strong>File ID</strong> ";
  if (helper = helpers.fileid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fileid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</br>\n	<strong>Thumbnail URL</strong> <a href=\"";
  if (helper = helpers.thumbnail) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.thumbnail); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" target=\"_blank\">";
  if (helper = helpers.thumbnail) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.thumbnail); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a></br>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.full), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<strong>Time created</strong> "
    + escapeExpression((helper = helpers.date || (depth0 && depth0.date),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.created), "h:mma", options) : helperMissing.call(depth0, "date", (depth0 && depth0.created), "h:mma", options)))
    + "</br>\n	<strong>Date created</strong> "
    + escapeExpression((helper = helpers.date || (depth0 && depth0.date),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.created), "MMMM D, YYYY", options) : helperMissing.call(depth0, "date", (depth0 && depth0.created), "MMMM D, YYYY", options)))
    + "</br>\n	<strong>Filesize</strong> "
    + escapeExpression((helper = helpers.fsize || (depth0 && depth0.fsize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.filesize), options) : helperMissing.call(depth0, "fsize", (depth0 && depth0.filesize), options)))
    + "</br>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.exif), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</p>\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.requested), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.full), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["JST"]["photo"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "\n				<button type=\"button\" class=\"btn btn-default request-full\"><i class=\"glyphicon glyphicon-import\"></i> Request</button>\n			";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n				<a href=\"/download/";
  if (helper = helpers._id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0._id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n					";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.downloaded), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</a>\n			";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "\n						<button type=\"button\" class=\"btn btn-default btn-xs\"><i class=\"glyphicon glyphicon-saved\"></i> Redownload</button>\n					";
  }

function program6(depth0,data) {
  
  
  return "\n						<button type=\"button\" class=\"btn btn-default btn-xs\"><i class=\"glyphicon glyphicon-download-alt\"></i> Download</button>\n					";
  }

  buffer += "<div class=\"panel panel-default\">\n	<div class=\"panel-body\">\n		<p>\n			<img class=\"img-responsive\" src=\"";
  if (helper = helpers.thumbnail) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.thumbnail); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n		</p>\n		<p>\n			<small><strong>Created</strong> "
    + escapeExpression((helper = helpers.date || (depth0 && depth0.date),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.created), "h:mm:ssa M/D/YY", options) : helperMissing.call(depth0, "date", (depth0 && depth0.created), "h:mm:ssa M/D/YY", options)))
    + "</small></br>\n			<small><strong>Filesize</strong> "
    + escapeExpression((helper = helpers.fsize || (depth0 && depth0.fsize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.filesize), options) : helperMissing.call(depth0, "fsize", (depth0 && depth0.filesize), options)))
    + "</small></br>\n		</p>\n		<div class=\"btn-group btn-group-xs\">\n			";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.requested), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.full), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<button type=\"button\" class=\"inspect btn btn-default\"><i class=\"glyphicon glyphicon-zoom-in\"></i> Inspect</button>\n		</div>\n	</div>\n</div>";
  return buffer;
  });

return this["JST"];

});