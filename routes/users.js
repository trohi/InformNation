var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');
var bcryp = require("bcrypt-nodejs");
var Article = require('../models/article');
var path = require('path');
var controller = require('../models/controller');

router.use(express.static(path.join(__dirname +'/public')));


router.get('/admin', controller.isLoggedIn, function (req, res, next){
  Article.find({"isApproved":false}, function(err, result){
  if(req.user.admin == "on"){
  res.render('user/adminProfile.hbs', {unApproved:result})
  } else {
    res.redirect('/')
  }
})
});


router.post('/admin',function(req, res, next){
  
  if(controller.value === 1){
    controller.approval(req, res, next)
  }
  if(controller.value === 2){
    controller.deleteArticle(req, res, next)
  }
  console.log(controller.value)
res.redirect('/');
})


var csrfProtection = csrf();
router.use(csrfProtection)


router.get('/publish', controller.isLoggedIn, function(req, res, next){
  var messages = req.flash('error')
  res.render('article/content.hbs',{csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0})
})

router.post('/publish', function(req, res, next){
  controller.publish(req, res);
  res.redirect('/')
})

router.get('/profile', controller.isLoggedIn, function(req, res, next){
  res.render('user/profile.hbs')
});


router.get('/edit', controller.isLoggedIn, function(req, res, next){
  var messages = req.flash('error')
  res.render('user/profileEdit.hbs',{csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0})
});

router.post('/edit', function(req, res, next){
  controller.updateRecord(req, res)
});

router.get('/logout', controller.isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.use('/', controller.notLoggedIn, function(req, res, next){
  
  next()
});


router.get('/signup', function(req, res, next){
  var messages = req.flash('error')
  res.render('user/sign-up.hbs', {csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0})
});


router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));


router.get('/signin', function(req, res, next){
  var messages = req.flash('error')
  res.render('user/sign-in.hbs', {csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0})
});


router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/',
  failureRedirect: '/user/signin',
  failureFlash: true
}));



module.exports = router;
