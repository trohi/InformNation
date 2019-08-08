var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../user model/user');

require("../controler/userControler");

var csrfProtection = csrf();
router.use(csrfProtection)


router.get('/profile', isLoggedIn, function(req, res, next){
  res.render('user/profile.hbs')
});



router.get('/admin', isLoggedIn, function (req, res, next){
  if(req.user.admin == "on"){
    res.render('user/adminProfile.hbs')
  } else {
    res.redirect('/')
  }
});
/* Pokusaj kreiranja rute za editovanje profile krisnika ali bezuspjesno
router.get('/edit', isLoggedIn, function(req, res, next){
  var messages = req.flash('error')
  editProfile()
  res.render('user/profileEdit.hbs',{csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0})
});

router.post('/edit', function(req, res, next){
  editProfile()
  res.redirect('/profile')
})
*/
router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
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

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
};

function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
};

/* helper function(profile edit)
var editProfile = function(){
User.updateUser(User.email, 
      {
          "email": req.body.email,
          "password": req.body.password,
          "city": req.body.city,
          "mobile": req.body.mobile
      }, function(err, data){
          if(err){
              return ("error during editing :" + err)
          } if(data){
              return data;
          }
      })
    }
*/


  /* NACIN ZA PRISTUPIT MONGODB PROPERTY-U TRENUTNOG USERA
  User.find({"admin":"on"}, function(err, user){
  console.log(user)
})
*/