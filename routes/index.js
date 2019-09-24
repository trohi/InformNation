var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var path  = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  Article.find({"isApproved": true},function(err, doc){
    res.render('index', { title: 'Inform-nation', approved: doc});
  });
});



router.use('/public', express.static('public'));
router.use('/models', express.static('models'))

module.exports = router;
