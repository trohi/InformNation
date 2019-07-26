var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../user model/user');


var csrfProtection = csrf();

router.use(csrfProtection)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inform-nation' });
});

router.get('/user/signup', function(req, res, next){
  var messages = req.flash('error')
  res.render('user/sign-up.hbs', {csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0})
});

router.get('/user/signin', function(req, res, next){
  res.render('user/sign-in.hbs')
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', function(req, res, next){
  res.render('user/profile.hbs')
})
/*
router.get('/user/admin', function(req, res, next){
  if(User.admin !== "on"){
     res.json("Authorization Error, Only Administrator user can access this route.")
  } else{
      res.render('user/adminProfile.hbs')
  }
});
*/

module.exports = router;
