var models = require('../models'),
    primus = require('../lib/server').primus;

exports.requested = function(req, res) {
  models.Photo.find({ 'requested': true, 'full': null }, 'fileid', function (err, results) {
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
  var thumb = new models.Photo(req.body);
  thumb.save(function (err) {
    if (err) {
      res.json(400, err);
      console.error(err);
    }
    else {
      res.send(200);
      primus.write({evt: 'photo:add', data: thumb});
      console.log("Thumbnail " + thumb.fileid + " stored in the database.");
    }
  });
};

exports.fullupload = function(req, res, next) {
  models.Photo.findOne({fileid: req.body.fileid, sender: req.body.sender}, function (err, thumb) {
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
          primus.write({evt: 'photo:change', data: thumb});
          res.send(200);
        }
      });
    }
  });
};
