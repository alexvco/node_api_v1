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



// Get Book
module.exports.getBookById = function(id, callback) {
  Book.findById(id, callback);
}



// Add Book
module.exports.addBook = function(book, callback) {
  Book.create(book, callback);
}



// Update Book
module.exports.updateBook = function(id, book, options, callback) {
  var query = {_id: id};
  var update = {
    title: book.title,
    genre: book.genre,
    description: book.description,
    author: book.author,
    publisher: book.publisher,
    pages: book.pages,
  }
  Book.findOneAndUpdate(query, update, options, callback);
}



// Delete Book
module.exports.removeBook = function(id, callback) {
  var query = {_id: id};
  Book.remove(query, callback);
}