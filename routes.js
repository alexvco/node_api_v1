var express = require('express');
var routes = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to mongoose
mongoose.connect('mongodb://localhost/node_api_v1')
var db = mongoose.connection

Genre = require('./models/genre');
Book = require('./models/book');



// https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/node_api_v1_development";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});


// To run the app: node routes
// Better yet is to run the app by typing the command: nodemon
// nodemon will know where your entry file is and restart the server everytime you make changes to this file.
// to install nodemon: npm install -g nodemon


routes.get('/', function(req, res){
  res.send('Hello Worlds');
});

routes.get('/api/v1/genres', function(req, res) {
  // For some reason mongoose was not working so i decided to use mongo client instead
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

routes.listen(3000);
console.log('Running on port 3000...')

