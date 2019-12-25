'use strict';

$(document).on('ready', function () {
  // Cached Variables
  var windowVar = $(window);
  var $main = $('html, body');
  var elImg = $('.bg-img');
  var elColor = $('.bg-color');
  var menuItems = $('.all-menu-wrapper .nav-link');
  var menuIcon = $('.menu-icon, #navMenuIcon');
  var menuBlock = $('.all-menu-wrapper');
  var reactToMenu = $('.page-main, .navbar-sidebar, .page-cover');
  var menuLinks = $('.navbar-mainmenu a, .navbar-sidebar a');
  var imageListSlide = $('.slide-show .img');
  var videoBg = $('.video-container video, .video-container object');
  var pageSectionDivs = $('.page-fullpage .section');
  var headerContainer = $('.hh-header');
  var slideElem = $('.slide');
  var arrowElem = $('.p-footer .arrow-d');
  var pageElem = $('.section');
  var mainPage = $('#mainpage');
  var sendEmailForm = $('.send_email_form');
  var sendMessageForm = $('.send_message_form');

  var myBee = $('#bee');

  // Variables
  var imageSlides = [];
  var pageSections = [];
  var pageAnchors = [];
  var scrollOverflow = true;
  var css3 = true;

  //Page Loader
  windowVar.on('load', function () {
    $('#pageloader').addClass('p-hidden');
    $('.section').addClass('anim');
  });

  // Subscribe and contact forms sender
  $("#submit-message").click(() => {
    
    var  nome = $('#message_form').find('input[name="name"]').val();
    var  email = $('#message_form').find('input[name="email"]').val();
    var  assunto = $('#message_form').find('input[name="assunto"]').val();
    var  mensagem = $('#message_form').find('textarea[name="mes-text"]').val();
      
    console.log({nome}, {email}, {assunto}, {mensagem})
    
  });

  // Background image as data attribut
  for (var i = 0; i < elImg.length; i++) {
    var src = elImg[i].getAttribute('data-image-src');
    elImg[i].style.backgroundImage = "url('" + src + "')";
    elImg[i].style.backgroundRepeat = 'no-repeat';
    elImg[i].style.backgroundPosition = 'center';
    elImg[i].style.backgroundSize = 'cover';
  }
  // Background color as data attribut
  for (var i = 0; i < elColor.length; i++) {
    var src = elColor[i].getAttribute('data-bgcolor');
    elColor[i].style.backgroundColor = src;
  }

  // Menu icon clicked
  menuIcon.on('click', function () {
    menuIcon.toggleClass('menu-visible');
    menuBlock.toggleClass('menu-visible');
    menuItems.toggleClass('menu-visible');
    reactToMenu.toggleClass('menu-visible');
    return false;
  });

  // Hide menu after a menu item clicked
  menuLinks.on('click', function () {
    menuIcon.removeClass('menu-visible');
    menuBlock.removeClass('menu-visible');
    menuItems.removeClass('menu-visible');
    reactToMenu.removeClass('menu-visible');
    return true;
  });

  // Projects carousel init
  new Swiper('.carousel-swiper-beta-demo .swiper-container', {
    pagination: '.carousel-swiper-beta-demo .items-pagination',
    paginationClickable: '.carousel-beta-alpha-demo .items-pagination',
    nextButton: '.carousel-swiper-beta-demo .items-button-next',
    prevButton: '.carousel-swiper-beta-demo .items-button-prev',
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
      1024: {
        slidesPerView: 3
      },
      800: {
        slidesPerView: 2,
        spaceBetween: 0
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      440: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    }
  });

  // Testimonials carousel init
  new Swiper('.testimonials .swiper-container', {
    pagination: '.testimonials .items-pagination',
    paginationClickable: '.testimonials .items-pagination',
    loop: true,
    grabCursor: true,
    centeredSlides: false,
    autoplay: 5000,
    // autoplay: 0,
    autoplayDisableOnInteraction: false,
    slidesPerView: 1,
    spaceBetween: 55,
    effect: 'slide'
  });

  // Slideshow init
  for (var i = 0; i < imageListSlide.length; i++) {
    var src = imageListSlide[i].getAttribute('data-src');
    imageSlides.push({
      src: src
    });
  }
  $('.slide-show').vegas({
    delay: 5000,
    shuffle: true,
    slides: imageSlides,
    animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight']
  });

  //Prepare content for animation
  $('.section .content .anim.anim-wrapped').wrap(
    "<span class='anim-wrapper'></span>"
  );

  // disable scroll overflow on small device
  if (windowVar.width() < 601) {
    scrollOverflow = false;
    css3 = false;
  }
  if (windowVar.height() < 480) {
    scrollOverflow = false;
    css3 = false;
  }

  // Get sections name
  for (var i = 0; i < pageSectionDivs.length; i++) {
    pageSections.push(pageSectionDivs[i]);
  }

  window.asyncEach(
    pageSections,
    function (pageSection, cb) {
      var anchor = pageSection.getAttribute('data-section');
      pageAnchors.push(anchor + '');
      cb();
    },
    function (err) {
      if (mainPage.width()) {
        // config fullpage.js
        mainPage.fullpage({
          menu: '#qmenu',
          anchors: pageAnchors,
          verticalCentered: false,
          css3: css3,
          navigation: true,
          responsiveWidth: 601,
          responsiveHeight: 480,
          scrollOverflow: scrollOverflow,
          scrollOverflowOptions: {
            click: true,
            submit: true
          },
          normalScrollElements: '.section .scrollable',
          afterRender: function () {
            videoBg.maximage('maxcover');

            // Fix for internet explorer
            // Detect IE 6-11
            var isIE = /*@cc_on!@*/ false || !!document.documentMode;
            if (isIE) {
              var contentColumns = $('.section .content .c-columns');
              contentColumns.height(windowVar.height());
              for (var i = 0; i < contentColumns.length; i++) {
                if (contentColumns[i].height <= windowVar.height()) {
                  contentColumns[i].style.height = '100vh';
                }
              }
            }

          
          },
          afterResize: function () {
            var pluginContainer = $(this);
            $.fn.fullpage.reBuild();
          },
          onLeave: function (index, nextIndex, direction) {
            // Behavior when a full page is leaved
            arrowElem.addClass('gone');
            pageElem.addClass('transition');
            slideElem.removeClass('transition');
            pageElem.removeClass('transition');
          },
          afterLoad: function (anchorLink, index) {
            // Behavior after a full page is loaded
            // hide or show clock
            if ($('.section.active').hasClass('hide-clock')) {
              headerContainer.addClass('gone');
            } else {
              headerContainer.removeClass('gone');
            }
          }
        });
      }
    }
  );
  // Scroll to fullPage.js next/previous section
  $('.scrolldown a, .scroll.down').on('click', function () {
    try {
      // fullpage scroll
      $.fn.fullpage.moveSectionDown();
    } catch (error) {
      // normal scroll
      $main.animate({
          scrollTop: window.innerHeight
        },
        400,
        function () {}
      );
    }
  });

  //Hide some ui on scroll
  windowVar.on('scroll', function () {
    var scrollpos = $(this).scrollTop();
    var siteHeaderFooter = $('.page-footer, .page-header');

    if (scrollpos > 100) {
      siteHeaderFooter.addClass('scrolled');
    } else {
      siteHeaderFooter.removeClass('scrolled');
    }
    if (window.matchMedia('(max-width: 480px)').matches) {
      console.log('sroll on window mobile');
      // $('.bar1').css('background-color', '#ef9b1e');
      // $('.bar2').css('background-color', '#ef9b1e');
      // $('.bar3').css('background-color', '#ef9b1e');
    } else {
      //...
    }
  });

  /**
   * Heade mobile Scroll
   */
});
