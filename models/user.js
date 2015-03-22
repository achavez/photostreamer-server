var mongoose = require('mongoose'),
    crypto = require('crypto');

var userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  key: {
    type: String,
    index: true,
    unique: true
  }

});

// Key generation helper
function keygen() {
  return crypto.randomBytes(20).toString('hex');
}

// On user creation, auto-generate the API key
userSchema.pre('save', function(next) {
  if(typeof this.key === 'undefined') {
    this.key = keygen();
  }
  next();
});

// A model method to generate a new API key
userSchema.methods.newKey = function(cb) {
  this.key = keygen();
  this.save(cb);
};

// A model static to find a user by key
userSchema.statics.findByKey = function(key, cb) {
  this.findOne({ key: key }, cb);
};

module.exports = mongoose.model('User', userSchema);