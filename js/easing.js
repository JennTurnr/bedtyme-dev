
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


// ---------   VIDEO CAROUSEL -------------- //
 /*
Copyright 2011 : Simone Gianni <simoneg@apache.org>

Released under The Apache License 2.0 
http://www.apache.org/licenses/LICENSE-2.0

*/

(function() {
    function createPlayer(jqe, video, options) {
        var ifr = $('iframe', jqe);
        if (ifr.length === 0) {
            ifr = $('<iframe scrolling="no">');
            ifr.addClass('player');
        }
        var src = 'http://www.youtube.com/embed/' + video.id;
        if (options.playopts) {
            src += '?';
            for (var k in options.playopts) {
                src+= k + '=' + options.playopts[k] + '&';
            }  
            src += '_a=b';
        }
        ifr.attr('src', src);
        jqe.append(ifr);  
    }
    
    function createCarousel(jqe, videos, options) {
        var car = $('div.carousel', jqe);
        if (car.length === 0) {
            car = $('<div>');
            car.addClass('carousel');
            jqe.append(car);
            
        }
        $.each(videos, function(i,video) {
            options.thumbnail(car, video, options); 
        });
    }
    
    function createThumbnail(jqe, video, options) {
        var imgurl = video.thumbnails[0].url;
        var img = $('img[src="' + imgurl + '"]');
        if (img.length !== 0) return;
        img = $('<img>');    
        img.addClass('thumbnail');
        jqe.append(img);
        img.attr('src', imgurl);
        img.attr('title', video.title);
        img.click(function() {
            options.player(options.maindiv, video, $.extend(true,{},options,{playopts:{autoplay:1}}));
        });
    }
    
    var defoptions = {
        autoplay: false,
        user: null,
        carousel: createCarousel,
        player: createPlayer,
        thumbnail: createThumbnail,
        loaded: function() {},
        playopts: {
            autoplay: 0,
            egm: 1,
            autohide: 1,
            fs: 1,
            showinfo: 0
        }
    };
    
    
    $.fn.extend({
        youTubeChannel: function(options) {
            var md = $(this);
            md.addClass('youtube');
            md.addClass('youtube-channel');
            var allopts = $.extend(true, {}, defoptions, options);
            allopts.maindiv = md;
            $.getJSON('http://gdata.youtube.com/feeds/users/' + allopts.user + '/uploads?alt=json-in-script&format=5&callback=?', null, function(data) {
                var feed = data.feed;
                var videos = [];
                $.each(feed.entry, function(i, entry) {
                    var video = {
                        title: entry.title.$t,
                        id: entry.id.$t.match('[^/]*$'),
                        thumbnails: entry.media$group.media$thumbnail
                    };
                    videos.push(video);
                });
                allopts.allvideos = videos;
                allopts.carousel(md, videos, allopts);
                allopts.player(md, videos[0], allopts);
                allopts.loaded(videos, allopts);
            });
        } 
    });
    
})();
        
$(function() {
    $('#player').youTubeChannel({user:'DJBEDTYME357'});
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