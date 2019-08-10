var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../user model/user');


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

router.get('/edit', isLoggedIn, function(req, res, next){
  var messages = req.flash('error')
  res.render('user/profileEdit.hbs',{csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0})
});

router.post('/edit', function(req, res, next){
 updateRecord(req, res)
})

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

/*
var editProfile = User.findOneAndUpdate({"email":req.user.email}, 
      {
          "email": res.user.email,
          "password": res.user.password,
          "city": res.user.city,
          "mobile": res.user.mobile
      },{new:true}, function(err, data){
          if(err){
              return ("error during editing :" + err)
          } if(data){
              return data;
          }
      })
      */
    



  /* NACIN ZA PRISTUPIT MONGODB 
  User.find({"admin":"on"}, function(err, user){
  console.log(user)
})
*/

function updateRecord(req, res){
 User.findOneAndUpdate({"email": req.user.email}, req.body, {new:true}, function(err, doc){
   if(!err){
     res.redirect("/user/profile")
   }
   else{
     console.log("error during edit "+ err)
   }
 })
}