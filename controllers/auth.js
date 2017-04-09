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

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

module.exports = router;
