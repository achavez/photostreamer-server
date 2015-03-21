/*
 * Routes for the Backbone.js client app
 */
var https = require('https'),
    http = require('http');

var models = require('../models'),
    primus = require('../lib/server').primus;

exports.home = function(req, res){
  res.render('photostream.hbs', {
    debug: global.v8debug !== "undefined"
  });
}

exports.download = function(req, res) {
  var id = req.param('id');
  models.Photo.findOne({'_id': id}, function(err, thumb) {
    if (err) {
      res.send(500, err);
      console.error(err);
    }
    else if (thumb) {
      var protocol = thumb.full.split('://')[0];
      if(protocol == 'https') {
        https.get(thumb.full, function(download) {
          streamDownload(res, download, thumb);
        });
      }
      else if(protocol == 'http') {
        http.get(thumb.full, function(download) {
          streamDownload(res, download, thumb);
        });
      }
    }
    else {
      res.send(400, 'Photo with file ID ' + id + ' not found.');
    }
  });
};

function streamDownload(res, download, thumb) {
  console.log("Initiating download for " + thumb.full);
  res.attachment();
  download.pipe(res, {end: false});
  download.on('end', function() {
    res.end();
    thumb.downloaded = true;
    thumb.save(function (err) {
      if (err) {
        console.error(err);
      }
      else {
        primus.write({evt: 'photo:change', data: thumb});
      }
    });
  });
}
