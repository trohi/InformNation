var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');
var bcryp = require("bcrypt-nodejs");
var Article = require('../models/article');



var csrfProtection = csrf();
router.use(csrfProtection)

router.get('/publish', isLoggedIn, function(req, res, next){
  var messages = req.flash('error')
  res.render('article/content.hbs',{csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0})
})

router.post('/publish', function(req, res, next){
publish(req, res);
res.redirect('/')
})

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
});

router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
  storyFinding(req, res)
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



function updateRecord(req, res){
  User.findOneAndUpdate({"email": req.user.email}, 
  {
  "email":req.body.email, 
  "password": bcryp.hashSync(req.body.password, bcryp.genSaltSync(5)),
  "city":req.body.city, 
  "mobile":req.body.mobile
  }, 
  {new:true}, 
  function(err, doc){
    if(!err){
      res.redirect("/user/profile")
    }
    else{
      console.log("error during edit "+ err)
    }
  })
 };

 var publish= function(req, res){
  var data = new Article({
    author: req.body.author,
    publicationDate: req.body.date,
    title: req.body.title,
    content: req.body.content
  })
  data.save( function(err, result){
    if(err){
      return req.flash('error');
    } if(result){
      return result
    }
  });
 };

 var storyFinding =function(req, res){
    Article.find(function(err, doc){
      if(err){
        console.log("No content found" + err)
      } 
      if(doc){
        return doc
      }
    })
 }
