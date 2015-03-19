module.exports = function(req, res, next) {
  if(req.method == 'POST') {
    if(!req.is('application/json')) {
      res.json(400, {
        "error": {
          "message": "Data must be submitted as application/json."
        }
      });
    }
    else {
      next();
    }
  }
  else {
    next();
  }
};
