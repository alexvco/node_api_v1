var mongoose = require('mongoose');

// book Schema
var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
  },
  pages: {
    type: String,
  }
});


var Book = module.exports = mongoose.model('Book', bookSchema); // module.exports is so that you can access Book model from routes file


// Get books (in mongo shell, db.books.find();)
module.exports.getBooks = function(callback, mylimit) {
  Book.find(callback).limit(mylimit);
}