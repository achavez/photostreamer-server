this["Templates"] = this["Templates"] || {};

this["Templates"]["download"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<tr>\n	<td>";
  if (helper = helpers.fileid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fileid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n	<td>"
    + escapeExpression((helper = helpers.fsize || (depth0 && depth0.fsize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.filesize), options) : helperMissing.call(depth0, "fsize", (depth0 && depth0.filesize), options)))
    + "</td>\n	<td><button type=\"button\" class=\"btn btn-primary btn-xs\"><i class=\"glyphicon glyphicon-download-alt\"></i></button></td>\n</tr>";
  return buffer;
  });

this["Templates"]["inspector"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "\n	<button type=\"button\" class=\"btn btn-primary request-full\"><i class=\"glyphicon glyphicon-import\"></i> Request file</button>\n";
  }

function program3(depth0,data) {
  
  
  return "\n	<button type=\"button\" class=\"btn btn-primary download\"><i class=\"glyphicon glyphicon-download-alt\"></i> Download</button>\n";
  }

  buffer += "<img class=\"img-responsive\" src=\"";
  if (helper = helpers.thumbnail) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.thumbnail); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n<p>\n	<small><strong>File ID</strong> ";
  if (helper = helpers.fileid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fileid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</small></br>\n	<small><strong>Time created</strong> "
    + escapeExpression((helper = helpers.date || (depth0 && depth0.date),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.created), "h:mma", options) : helperMissing.call(depth0, "date", (depth0 && depth0.created), "h:mma", options)))
    + "</small></br>\n	<small><strong>Date created</strong> "
    + escapeExpression((helper = helpers.date || (depth0 && depth0.date),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.created), "MMMM D, YYYY", options) : helperMissing.call(depth0, "date", (depth0 && depth0.created), "MMMM D, YYYY", options)))
    + "</small></br>\n	<small><strong>Filesize</strong> "
    + escapeExpression((helper = helpers.fsize || (depth0 && depth0.fsize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.filesize), options) : helperMissing.call(depth0, "fsize", (depth0 && depth0.filesize), options)))
    + "</small></br>\n	<small><strong>Size</strong> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.dimensions)),stack1 == null || stack1 === false ? stack1 : stack1.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px x "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.dimensions)),stack1 == null || stack1 === false ? stack1 : stack1.height)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px</small>\n</p>\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.requested), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.full), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["Templates"]["photo"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "\n				<button type=\"button\" class=\"btn btn-default request-full\"><i class=\"glyphicon glyphicon-import\"></i> Request</button>\n			";
  }

function program3(depth0,data) {
  
  
  return "\n				<button type=\"button\" class=\"btn btn-default\"><i class=\"glyphicon glyphicon-download-alt\"></i> Download</button>\n			";
  }

  buffer += "<div class=\"panel panel-default\">\n	<div class=\"panel-body\">\n		<img class=\"img-responsive\" src=\"";
  if (helper = helpers.thumbnail) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.thumbnail); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\n		<p>\n			<small><strong>Created</strong> "
    + escapeExpression((helper = helpers.date || (depth0 && depth0.date),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.created), "h:mm:ssa M/D/YY", options) : helperMissing.call(depth0, "date", (depth0 && depth0.created), "h:mm:ssa M/D/YY", options)))
    + "</small></br>\n			<small><strong>Filesize</strong> "
    + escapeExpression((helper = helpers.fsize || (depth0 && depth0.fsize),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.filesize), options) : helperMissing.call(depth0, "fsize", (depth0 && depth0.filesize), options)))
    + "</small></br>\n			<small><strong>Size</strong> "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.dimensions)),stack1 == null || stack1 === false ? stack1 : stack1.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px x "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.dimensions)),stack1 == null || stack1 === false ? stack1 : stack1.height)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px</small>\n		</p>\n		<div class=\"btn-group btn-group-xs\">\n			";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.requested), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.full), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<button type=\"button\" class=\"inspect btn btn-default\"><i class=\"glyphicon glyphicon-zoom-in\"></i> Inspect</button>\n		</div>\n	</div>\n</div>";
  return buffer;
  });