// To run the app: node routes
// Better yet is to run the app by typing the command: nodemon
// nodemon will know where your entry file is and restart the server everytime you make changes to this file.
// to install nodemon: npm install -g nodemon

var express = require('express');
var routes = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to mongoose
mongoose.connect('mongodb://localhost/node_api_v1')
var db = mongoose.connection

// https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
// mongoose was giving a blank array so used this instead
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/node_api_v1_development";

var ObjectId = require('mongodb').ObjectId; // this is so that i can find object by its id


Genre = require('./models/genre');
Book = require('./models/book');




routes.listen(3000);
console.log('Running on port 3000...')




routes.get('/', function(req, res){
  res.send('Hello Worlds');
});


// INDEX
routes.get('/api/v1/genres', function(req, res) {
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
    if(err){
      throw err;
    }
    res.json(books);
  });
});


// SHOW
routes.get('/api/v1/genres/:_id', function(req, res) {
  var id = req.params._id;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("genres").findOne({_id: ObjectId(id)}, function(err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

// POST

// UPDATE

// DELETE



