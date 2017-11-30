var express = require('express');
var routes = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to mongoose
mongoose.connect('mongodb://localhost/node_api_v1')
var db = mongoose.connection


// To run the app: node routes
// Better yet is to run the app by typing the command: nodemon
// nodemon will know where your entry file is and restart the server everytime you make changes to this file.
// to install nodemon: npm install -g nodemon
routes.listen(3000);
console.log('Running on port 3000...')

routes.get('/', function(req, res){
  res.send('Hello Worlds');
});

