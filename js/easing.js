
/*
 * Coded by Jason Mayes 2014.
 * Please keep this disclaimer if you use this code.
 * www.jasonmayes.com
*/


window.requestAnimationFrame = (function() {
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function addEventHandler(elem, eventType, handler) {
    if (elem.addEventListener) {
        elem.addEventListener (eventType, handler, false);
    }
    else if (elem.attachEvent) {
        elem.attachEvent ('on' + eventType, handler);
    }
}

var animator = function() {
  var amount = 0;
  var scrollInProgess = false;
  var tailOff = 16;

  function evaluate (functionName) {
    amount = amount - Math.ceil(amount / tailOff); 
    if (amount > 0) {
      requestAnimationFrame(functionName);
    } else {
      scrollInProgess = false;
    }
  }

  function getDocHeight() {
    var D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  }

  function scrollDownReal(timestamp) {
    window.scrollBy(0, Math.ceil(amount / tailOff));  
      evaluate(scrollDownReal);
  }

  function scrollUpReal(timestamp) {
    window.scrollBy(0, -Math.ceil(amount / tailOff));
      evaluate(scrollUpReal);
  }

  return {
    scrollDown: function(pixels) {
      if (!scrollInProgess) {
        scrollInProgess = true;
        amount = pixels;
        requestAnimationFrame(scrollDownReal);
      }
    },
    scrollUp: function(pixels) {
      if (!scrollInProgess) {
        scrollInProgess = true;
        amount = pixels;
        requestAnimationFrame(scrollUpReal);
      }
    },
    scrollToPercent: function(percent) {
      if (!scrollInProgess) {
        scrollInProgess = true;
        var offset = ((getDocHeight() * (percent / 100)) - document.body.scrollTop);
        if (offset > 0) {
          amount = offset;
          requestAnimationFrame(scrollDownReal);
        } else {
          amount = -offset;
          requestAnimationFrame(scrollUpReal);
        }
      }
    },
  };
}();


// Nav Menu Buttons
// Bio Section

var bio = document.getElementById('bio');

addEventHandler(bio, 'click', function(e) {
    e.preventDefault();
    animator.scrollToPercent(15);
});

// Videos Section
var videos = document.getElementById('videos');

addEventHandler(videos, 'click', function(e) {
    e.preventDefault();
    animator.scrollToPercent(41.9);
});


var tour = document.getElementById('tour');

addEventHandler(tour, 'click', function(e) {
    e.preventDefault();
    animator.scrollToPercent(51.5);
});

var shop = document.getElementById('shop');

addEventHandler(shop, 'click', function(e) {
    e.preventDefault();
    animator.scrollToPercent(60.7);
});

var contact = document.getElementById('contact');

addEventHandler(contact, 'click', function(e) {
    e.preventDefault();
    animator.scrollToPercent(73);
});




/*
// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs

$('body').scrollspy({
    target: '.navbar-fixed-top'
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
}); 

*/