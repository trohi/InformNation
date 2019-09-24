

/* TEST of a jQuery 


$(document).ready(function(){
  $('.kukk').click(function(){
    $(this).myFun()
  })
  
  $.fn.myFun = function(){
    Article.findOne({"author":"test@test.com"},function(err, doc){
      if(!err){
        return doc
      }if(err){
        return err
      }
    })
  
  }
  })

$(document).ready(function(){
  $('#kolotek').on('click', function(){
  
    $.ajax({
      url:"/user/admin",
      method:"GET",
      contentType: "javascript",
      success: function(response){
        console.log(response)
      
       }
      }
    )
  })
})

*/










