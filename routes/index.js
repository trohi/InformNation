var express = require('express');
var router = express.Router();
var User = require('../user model/user');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inform-nation' });
});

<<<<<<< HEAD
router.get('/user/signup', function(req, res, next){
  var messages = req.flash('error')
  res.render('user/sign-up.hbs', {csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0})
});

router.get('/user/signin', function(req, res, next){
  var messages = req.flash('error')
  res.render('user/sign-in.hbs', {csrfToken: req.csrfToken(), messages: messages, hasError: messages.length > 0})
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.post('/user/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}))

router.get('/user/profile', function(req, res, next){
  res.render('user/profile.hbs')
})
/* this is going to be an admin controls rout
router.get('/user/admin', function(req, res, next){
  if(User.admin !== "on"){
     res.json("Authorization Error, Only Administrator user can access this route.")
  } else{
      res.render('user/adminProfile.hbs')
  }
});
*/
=======
>>>>>>> mybranch

module.exports = router;
