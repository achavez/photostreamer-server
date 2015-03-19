var models = require('../models'),
    server = require('../lib/server');

exports.requested = function(req, res) {
  models.Thumbnail.find({ 'requested': true, 'full': null }, 'fileid', function (err, results) {
    if (err) {
      console.error(err);
    }
    else {
      var thumbnails = results.map(function(result) {
        return result.fileid;
      });
      res.json(200, thumbnails);
    }
  });
}

exports.thumbupload = function(req, res, next){
  var thumb = new models.Thumbnail(req.body);
  thumb.save(function (err) {
    if (err) {
      res.json(400, err);
      console.error(err);
    }
    else {
      res.send(200);
      server.backend.emit('created', thumb);
      console.log("Thumbnail " + thumb.fileid + " stored in the database.");
    }
  });
};

exports.fullupload = function(req, res, next) {
  models.Thumbnail.findOne({fileid: req.body.fileid, sender: req.body.sender}, function (err, thumb) {
    if (err) {
      res.json(400, err);
      console.error(err);
    }
    else {
      thumb.full = req.body.full;
      thumb.requested = true;
      thumb.save(function (err) {
        if (err) {
          res.json(400, err);
        }
        else {
          console.log("Full resolution photo for " + thumb.fileid + " submitted.");
          server.backend.emit('updated', thumb);
          res.send(200);
        }
      });
    }
  });
};
