var passport = require('./config/ppConfig')
require('dotenv').config({silent: true})
var session = require('express-session')
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var app = express();


if (process.env.NODE_ENV === "test") {
  mongoose.connect('mongodb://localhost/express-authentication')
} else {
  mongoose.connect('mongodb://localhost/express-authentication-test')
}

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session())

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
