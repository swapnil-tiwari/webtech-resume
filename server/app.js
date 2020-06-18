const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const passport = require('passport');

const userApi = require('./server/routes/user');
require('./server/config/dbconnection');
// require('./server/config/passport')(passport);

const app = express();

const port = 3000;

require('./server/model/User');
const User = mongoose.model('users');
// app.use(express.limit('50MB'));
app.use(bodyParser.json({limit: '50MB'}));
app.use(bodyParser.urlencoded({limit: '50MB', extended: false}));
app.use(express.static(__dirname + '/dist/rohit'));

app.use(function (req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/user', userApi);
//======Updated============//
app.use('/edusmith', require('./server/routes/edusmith'));


// Server connection API

const server = http.createServer(app);
server.listen(port, () => {
  console.log('Serer is running at: ', port)
})
