var Article = require('../models/article');
var bcryp = require('bcrypt-nodejs');
var User = require('../models/user');


var search  = function(){
  var textValue;
  var input = document.getElementById("searchBar")
  var filter = input.value.toUpperCase()
  var titles = document.getElementById("indexTitle")
  for(var i = 0; i< titles.length; i++){
      a = titles[i][0]
      textValue = a.textContent || a.innerText
      if(textValue.toUpperCase().indexOf(filter) > -1){
        titles[i].style.display = ""
      }
      else {
        titles[i].style.display = "none"
      }
    
  }
}


var isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}


var notLoggedIn= function(req, res, next){
    if(!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}


var updateRecord= function(req, res){
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


var publish = function(req, res){
    var data = new Article({
      author: req.body.author,
      publicationDate: req.body.date,
      title: req.body.title,
      content: req.body.content,
      isApproved: false
    })
    data.save( function(err, result){
      if(err){
        return req.flash('error');
      } if(result){
        return result
      }
    });
};

function approval(req, res, next){ 
    Article.findOneAndUpdate({"_id": req.body.id}, {"isApproved":true}, {new:true}, function(err, doc){
      if(err){
        return req.flash('error')
      }
      if(doc){
        return doc
      }
    })
  }  
  
  function deleteArticle(req,res,next){
      Article.findByIdAndRemove({"_id":req.body.id},function(err, result){
          if(!err){
              return result
          } else {
              return req.flash('error')
          }
      })
  }


module.exports ={
    isLoggedIn: isLoggedIn,
    notLoggedIn: notLoggedIn,
    updateRecord: updateRecord,
    publish: publish,
    approval: approval,
    deleteArticle: deleteArticle
  }