$(function($){

  var index = $('.slideshow img.active').parent().index();
  var n = index;

  setInterval(function(){

    if(n == 4){
      n = 0;
    }

   $('.slideshow img').removeClass('active');
   $('.slideshow img').eq(n).addClass('active');

   $('.indicator li').removeClass('active');
   $('.indicator li').eq(n).addClass('active');

   n++;
 }, 3000);

});
