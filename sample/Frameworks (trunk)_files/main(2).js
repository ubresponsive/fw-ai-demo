/*Switch Js */
$(document).ready(function () {
  $('.button-navbar a').hover(function () {
    $('.button-navbar').find('a').removeClass('active-button');
    $(this).toggleClass('active-button');
  });

  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
  
});
/*Animation Js */
/*$(document).ready(function(){
  $('.nav-inner-wrapper li a').click(function(){
    var targetID = $(this).attr('href');
    $([document.documentElement, document.body]).animate({
            scrollTop: $(targetID).offset().top - 100
        }, 1000);
  });
});*/
$('.nav-inner-wrapper ul li').find('a').click(function (event) {
  event.preventDefault();
  var sectionLink = $(this).attr('href');
  $([document.documentElement, document.body]).animate({
    scrollTop: $(sectionLink).offset().top - 100
  }, 1000);
});
/*Scroll Js */
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 10) {
    $("#header").addClass("darkHeader");

  } else {
    $("#header").removeClass("darkHeader");
  }
});
/*pop-up box Js */
var winWidth = $(window).width();
$('.feature-box').find('a.box-wrapper').on("click",  function (event) {
  event.preventDefault();
  $('.feature-box').find('a.box-wrapper').removeClass('active');
  $(".feature-box").find('.pop-up-wrapper').removeClass('active-box');
  $(this).addClass('active');
  var id = $(this).attr("id");
  var res = id.split("-");
  $("#pop-up-" + res[1]).addClass('active-box');
  var container = $(".all-pop-up .pop-up-wrapper");
  $('html,body').animate({
      scrollTop:  $("#pop-up-" + res[1]).offset().top - 200
  }, 'slow');
});
$('.close-btn').on("click", function () {
  event.preventDefault();
  $('.feature-box').find('a').removeClass('active');
  $(".feature-box .pop-up-wrapper").removeClass('active-box');

});
if (winWidth < 768) {
  $('#features .feature-box').find('a.box-wrapper').on("click",  function (event) {
    event.preventDefault();
    $('#features .feature-box').find('a.box-wrapper').removeClass('active');
    $("#features .feature-box").find('.pop-up-wrapper').removeClass('active-box');
    $(this).removeClass('active');
    var id = $(this).attr("id");
    var res = id.split("-");
    $("#features #pop-up-" + res[1]).addClass('active-box');
    
  });
}
$(document).click(function (event) {
  if (!$(event.target).closest(".box-wrapper").length) {
    $("body").find(".feature-box .pop-up-wrapper").removeClass("active-box");
  }
});

/* SLider Js */
var swiper = new Swiper('.buying-groups .swiper-container', {
  pagination: '.swiper-pagination',
  slidesPerView: 'auto',
  paginationClickable: true,
  spaceBetween: 20,
  autoplay: true,
  loop: true,
  slidesPerView: 7,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 7,
    },
  }
});
/* Testimonial Js */
var swiper = new Swiper('.testimonial-section .swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  spaceBetween: 0,
  speed: 1000,
  autoplay: {
    delay: 7500,
  },
  coverflowEffect: {
    // rotate: 0,
    // stretch: 0,
    // depth: 150,
    // modifier: 3,
    rotate: 0,
    stretch: 0,
    depth: 0,
    slideShadows: false,
  },
});
$('.testimonial-section .swiper-container .swiper-slide').on('mouseover', function() {
  swiper.autoplay.stop();
});

$('.testimonial-section .swiper-container .swiper-slide').on('mouseout', function() {
  swiper.autoplay.start();
});

/* Counter Js */
(function ($) {
  'use strict';
  $('.count-num').rCounter({
    duration: 40
  });
})(jQuery);


// team member popups
(function(){
  var $team_member = $('.team-member');
  var $close = $('.team-member__popup').find('.close');

  $close.on('click', function(e){
    e.preventDefault();
    close_popup();
  });

  function close_popup() {
    $('.team-member__popup').removeClass('show');
  }
 
  if($team_member.length) {

    $team_member.on('click', function(e){
      e.preventDefault();

      var target = $(this).data('target');

      close_popup();
      $(target).addClass('show');

      $('html,body').animate({
          scrollTop:  $(target).offset().top - 200
      }, 'slow');
    });
  }

  $(document).on('mouseup touchend', function(e) {
      var container = $('.team-member__popup.show');

      if (!container.is(e.target) && container.has(e.target).length === 0) {
          if($("body").find(".team-member__popup").hasClass('show')) {
            close_popup();
          }
      }
  });

})();