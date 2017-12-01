var mongoose = require('mongoose');

// Genre Schema
var genreSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});


var Genre = module.exports = mongoose.model('Genre', genreSchema); // module.exports is so that you can access Genre model from routes file


// Get Genres (in mongo shell, db.genres.find();)
module.exports.getGenres = function(callback, mylimit) {
  Genre.find(callback).limit(mylimit);
}

