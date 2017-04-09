var express = require('express');
var passport = require('../config/ppConfig')
// var db = require('../models')
var User = require('../models/user')
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function (req,res) {
  User.create({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  }, function (err, createdUser) {
    if (err) {
      req.flash('error', 'Could not create user account')
      res.redirect('/auth/signup')
    } else {
      passport.authenticate('local' , {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req,res)

    }
  })
})

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}))


router.get('/logout', function(req,res) {
  req.logout()
  req.flash('success', 'You have logged out')
  res.redirect('/')
})



module.exports = router;
