// To run the app: node routes
// Better yet is to run the app by typing the command: nodemon
// nodemon will know where your entry file is and restart the server everytime you make changes to this file.
// to install nodemon: npm install -g nodemon

var express = require('express');
var routes = express();

// Need the use the following so we can parse the request body. i.e., req.body
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
routes.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
routes.use(bodyParser.json());

// Connect to mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_api_v1')
var db = mongoose.connection

// mongoose was giving a blank array so used MongoClient instead, for more info visit: https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/node_api_v1_development";


var ObjectId = require('mongodb').ObjectId; // this is so that i can find object by its id


Genre = require('./models/genre');
Book = require('./models/book');




routes.listen(3000);
console.log('Running on port 3000...')




routes.get('/', function(req, res){
  res.send('Hello World');
});










// INDEX
routes.get('/api/v1/genres', function(req, res) {
  console.log('all');
  // For some reason mongoose was not working so i decided to use mongo client instead, hopefully there is a way to refactor this code
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("genres").find().toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

routes.get('/api/v1/books', function(req, res) {
  Book.getBooks(function(err, books){
    if(err) throw err;
    res.json(books);
  });
});





// SHOW
routes.get('/api/v1/genres/:_id', function(req, res) {
  var id = req.params._id;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("if id not found render json 404");
    db.collection("genres").findOne({_id: ObjectId(id)}, function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

routes.get('/api/v1/books/:_id', function(req, res) {
  Book.getBookById(req.params._id, function(err, book) {
    if(err) throw err;
    res.json(book);
  });
});





// POST
routes.post('/api/v1/genres', function(req, res) {
  var genre = req.body;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("genres").insertOne(genre, function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

routes.post('/api/v1/books', function(req, res) {
  var book = req.body;
  Book.addBook(book, function(err, book) {
    if(err) throw err;
    res.json(book);
  });
});





// UPDATE
routes.put('/api/v1/genres/:_id', function(req, res) {
  var id = req.params._id;
  var genre = req.body;
  updates = {
    name: genre.name,
    esh: "esh"
  }
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("genres").updateOne({_id: ObjectId(id)}, updates, function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

routes.put('/api/v1/books/:_id', function(req, res) {
  var id = req.params._id;
  var book = req.body;
  Book.updateBook(id, book, {}, function(err, book) {
    if (err) throw err;
    res.json(book);
  });
});






// DELETE
routes.delete('/api/v1/genres/:_id', function(req, res) {
  // note that when you make this delete request, it is giving TypeError: Cannot read property '1' of null
  // so for some reason it is expecting some json to be sent, so send a useless json in the request body ({"useless": "useless"})...
  // or else (maybe better solution) specify in the header -> Content-Length: 0
  var id = req.params._id;
  MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    db.collection("genres").deleteOne({_id: ObjectId(id)}, function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

routes.delete('/api/v1/books/:_id', function(req, res) {
  var id = req.params._id;
  Book.removeBook(id, function(err, book) {
    if (err) throw err;
    res.json(book);
  });
});
