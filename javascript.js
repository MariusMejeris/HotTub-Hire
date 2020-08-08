var slideshowDuration = 4000;
var slideshow = $(".main-content .slideshow");

function slideshowSwitch(slideshow, index, auto) {
  if (slideshow.data("wait")) return;

  var slides = slideshow.find(".slide");
  var pages = slideshow.find(".pagination");
  var activeSlide = slides.filter(".is-active");
  var activeSlideImage = activeSlide.find(".image-container");
  var newSlide = slides.eq(index);
  var newSlideImage = newSlide.find(".image-container");
  var newSlideContent = newSlide.find(".slide-content");
  var newSlideElements = newSlide.find(".caption > *");
  if (newSlide.is(activeSlide)) return;

  newSlide.addClass("is-new");
  var timeout = slideshow.data("timeout");
  clearTimeout(timeout);
  slideshow.data("wait", true);
  var transition = slideshow.attr("data-transition");
  if (transition == "fade") {
    newSlide.css({
      display: "block",
      zIndex: 2
    });
    newSlideImage.css({
      opacity: 0
    });

    TweenMax.to(newSlideImage, 1, {
      alpha: 1,
      onComplete: function() {
        newSlide.addClass("is-active").removeClass("is-new");
        activeSlide.removeClass("is-active");
        newSlide.css({ display: "", zIndex: "" });
        newSlideImage.css({ opacity: "" });
        slideshow.find(".pagination").trigger("check");
        slideshow.data("wait", false);
        if (auto) {
          timeout = setTimeout(function() {
            slideshowNext(slideshow, false, true);
          }, slideshowDuration);
          slideshow.data("timeout", timeout);
        }
      }
    });
  } else {
    if (newSlide.index() > activeSlide.index()) {
      var newSlideRight = 0;
      var newSlideLeft = "auto";
      var newSlideImageRight = -slideshow.width();
      var newSlideImageLeft = "auto";
      var newSlideImageToRight = 0;
      var newSlideImageToLeft = "auto";
      var newSlideContentLeft = "auto";
      var newSlideContentRight = 0;
      var activeSlideImageLeft = -slideshow.width();
    } else {
      var newSlideRight = "";
      var newSlideLeft = 0;
      var newSlideImageRight = "auto";
      var newSlideImageLeft = -slideshow.width() ;
      var newSlideImageToRight = "";
      var newSlideImageToLeft = 0;
      var newSlideContentLeft = 0;
      var newSlideContentRight = "auto";
      var activeSlideImageLeft = slideshow.width();
    }

    newSlide.css({
      display: "block",
      width: 0,
      right: newSlideRight,
      left: newSlideLeft,
      zIndex: 2
    });

    newSlideImage.css({
      width: slideshow.width(),
      right: newSlideImageRight,
      left: newSlideImageLeft
    });

    newSlideContent.css({
      width: slideshow.width(),
      left: newSlideContentLeft,
      right: newSlideContentRight
    });

    activeSlideImage.css({
      left: 0
    });

    TweenMax.set(newSlideElements, { y: 20, force3D: true });
    TweenMax.to(activeSlideImage, 1, {
      left: activeSlideImageLeft,
      ease: Power3.easeInOut
    });

    TweenMax.to(newSlide, 1, {
      width: slideshow.width(),
      ease: Power3.easeInOut
    });

    TweenMax.to(newSlideImage, 1, {
      right: newSlideImageToRight,
      left: newSlideImageToLeft,
      ease: Power3.easeInOut
    });

    TweenMax.staggerFromTo(
      newSlideElements,
      0.8,
      { alpha: 0, y: 60 },
      { alpha: 1, y: 0, ease: Power3.easeOut, force3D: true, delay: 0.6 },
      0.1,
      function() {
        newSlide.addClass("is-active").removeClass("is-new");
        activeSlide.removeClass("is-active");
        newSlide.css({
          display: "",
          width: "",
          left: "",
          zIndex: ""
        });

        newSlideImage.css({
          width: "",
          right: "",
          left: ""
        });

        newSlideContent.css({
          width: "",
          left: ""
        });

        newSlideElements.css({
          opacity: "",
          transform: ""
        });

        activeSlideImage.css({
          left: ""
        });

        slideshow.find(".pagination").trigger("check");
        slideshow.data("wait", false);
        if (auto) {
          timeout = setTimeout(function() {
            slideshowNext(slideshow, false, true);
          }, slideshowDuration);
          slideshow.data("timeout", timeout);
        }
      }
    );
  }
}

function slideshowNext(slideshow, previous, auto) {
  var slides = slideshow.find(".slide");
  var activeSlide = slides.filter(".is-active");
  var newSlide = null;
  if (previous) {
    newSlide = activeSlide.prev(".slide");
    if (newSlide.length === 0) {
      newSlide = slides.last();
    }
  } else {
    newSlide = activeSlide.next(".slide");
    if (newSlide.length == 0) newSlide = slides.filter(".slide").first();
  }

  slideshowSwitch(slideshow, newSlide.index(), auto);
}

function homeSlideshowParallax() {
  var scrollTop = $(window).scrollTop();
  if (scrollTop > windowHeight) return;
  var inner = slideshow.find(".slideshow-inner");
  var newHeight = windowHeight - scrollTop / 2;
  var newTop = scrollTop * 0.8;

  inner.css({
    transform: "translateY(" + newTop + "px)",
    height: newHeight
  });
}

$(document).ready(function() {
  $(".slide").addClass("is-loaded");

  $(".slideshow .arrows .arrow").on("click", function() {
    slideshowNext($(this).closest(".slideshow"), $(this).hasClass("prev"));
  });

  $(".slideshow .pagination .item").on("click", function() {
    slideshowSwitch($(this).closest(".slideshow"), $(this).index());
  });

  $(".slideshow .pagination").on("check", function() {
    var slideshow = $(this).closest(".slideshow");
    var pages = $(this).find(".item");
    var index = slideshow.find(".slides .is-active").index();
    pages.removeClass("is-active");
    pages.eq(index).addClass("is-active");
  });

  var timeout = setTimeout(function() {
    slideshowNext(slideshow, false, true);
  }, slideshowDuration);

  slideshow.data("timeout", timeout);
});

if ($(".main-content .slideshow").length > 1) {
  $(window).on("scroll", homeSlideshowParallax);
}

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
//Hide onClick NavBar
$('.navbar-nav>li>a').on('click', function(){
  $('.navbar-collapse').collapse('hide');
});

//Language selection DropDown
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
// AOS styles
AOS.init({
  
})

var elmnt = document.getElementById("about-section").scrollHeight;

function getFunction() {
  var x = elmnt.scrollWidth;
  var y = elmnt.scrollHeight;
}

function setFunction() {
  elmnt.style.height = y.scrollHeight + "100px";
  elmnt.style.width = y.scrollWidth + "100px";
}

// ==UserScript==
// @name        Medium: remove location hash
// @namespace   http://efcl.info/
// @description Remove location hash from medium
// @include     https://medium.com/*#*
// @version     1
// @grant       none
// ==/UserScript==

function removeLocationHash(){
  var noHashURL = window.location.href.replace(/#.*$/, '');
  window.history.replaceState('', document.title, noHashURL) 
}
window.addEventListener("popstate", function(event){
  removeLocationHash();
});
window.addEventListener("hashchange", function(event){
  event.preventDefault();
  removeLocationHash();
});
window.addEventListener("load", function(){
  removeLocationHash();
});