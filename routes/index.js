var express = require('express');
var router = express.Router();
var Article = require('../models/article');


/* GET home page. */
router.get('/', function(req, res, next) {
  Article.find(function(err, doc){
    res.render('index', { title: 'Inform-nation', article: doc });
  });
});


module.exports = router;
