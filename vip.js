$(function(){
   $("#top").click(function(e){ 
       e.preventDefault();
       $("body","html").animate({scrollTop:'0px'},300);
   });
})