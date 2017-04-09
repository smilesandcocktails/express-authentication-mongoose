var passport = require('../config/ppConfig')
var User = require('../models/user')
var express = require('express');
var router = express.Router();

router.post('/signup', function (req,res) {
  User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  }, function (err, createdUser) {
    if (err) {
      console.log('An error occured: ' + err)
      res.redirect('/auth/signup')
    } else {
      res.redirect('/')
    }
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}))

router.post('/signup', function(req,res) {
  User.create({
    email:req.body.email,
    name:req.body.name,
    password:req.body.password
  }, function(err, createdUser){
    if(err) {
      console.log('An error occurred: ' + err)
      res.redirect('/auth/signup')
    } else {
      passport.authenticate('local', {
        successRedirect: '/'
      })(req, res)
    }
  })
})

router.get('/logout', function(req,res) {
  req.logout()
  console.log('logged out')
  res.redirect('/')
})

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

module.exports = router;
