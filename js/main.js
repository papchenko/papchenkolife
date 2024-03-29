"use strict";

// home
window.addEventListener("load", windowLoad);
function windowLoad() {
  document.body.classList.add("loaded");

  const items = document.querySelectorAll("[data-item]");
  const options = {
    threshold: 0.2,
  };
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  items.forEach((item) => {
    observer.observe(item);
  });

  imagesInit();
  gridInit();
}

// gallery
// sizing images
function imagesInit() {
  const images = document.querySelectorAll(".article__image");
  if (images.length) {
    images.forEach((image) => {
      const imageItem = image.querySelector("img");
      const padding = (imageItem.offsetHeight / imageItem.offsetWidth) * 100;
      image.style.paddingBottom = `${padding}%`;
      imageItem.classList.add("init");
    });
  }
}

// isotope
function gridInit() {
  const items = document.querySelector(".articles__items");
  const itemsGrid = new Isotope(items, {
    itemSelector: ".article",
    masonry: {
      fitWidth: true,
      gutter: 20,
    },
  });

  // sorts
  document.addEventListener("click", documentActions);
  function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.closest(".filter-articles__item")) {
      const filterItem = targetElement.closest(".filter-articles__item");
      const filterValue = filterItem.dataset.filter;
      const filterActiveItem = document.querySelector(
        ".filter-articles__item.active"
      );

      filterValue === "*"
        ? itemsGrid.arrange({ filter: `` })
        : itemsGrid.arrange({ filter: `[data-filter="${filterValue}"]` });

      filterActiveItem.classList.remove("active");
      filterItem.classList.add("active");
      e.preventDefault();
    }
  }
}

//up
document.addEventListener("DOMContentLoaded", () => {
  let toUp = document.querySelector(".up");

  window.onscroll = function () {
    if (window.pageYOffset > 350) {
      toUp.style.display = "block";
    } else {
      toUp.style.display = "none";
    }
  };

  toUp.addEventListener("click", () => {
    window.scrollBy({
      top: -document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });
});

// animation on load
function onLoadPage() {
  window.addEventListener('load', () => {
    document.documentElement.add('loaded');
  });
}

// sticky header
var container = document.querySelector('.container');
var stickySidebar = document.querySelector('.sticky-header');

document.addEventListener('scroll', function() {
  stickify(container, stickySidebar);
});

function stickify(wrapper, stickyEl) {
  var wrapperRect = wrapper.getBoundingClientRect();
  var stickyRect = stickyEl.getBoundingClientRect();
  var windowHeight = window.innerHeight;
  
  if (wrapperRect.bottom < windowHeight) {
    stickyEl.classList.add('bottom');
  } else if (wrapperRect.top < 0) {
    stickyEl.classList.add('fixed');
  } else if (stickyRect.top <= wrapperRect.top) {
    stickyEl.classList.remove('fixed');
    stickyEl.classList.remove('bottom');
  }
}

// glbox
const lightbox = GLightbox({
  touchNavigation: true,
  loop: true,
  autoplayVideos: true
});
const ssLightbox = function() {
  const folioLightbox = function() {

      const folioLinks = document.querySelectorAll('.brick .entry__link');
      const modals = [];

      folioLinks.forEach(function(link) {
          let modalbox = link.getAttribute('href');
          let instance = basicLightbox.create(
              document.querySelector(modalbox),
              {
                  onShow: function(instance) {
                      document.addEventListener("keydown", function(event) {
                          event = event || window.event;
                          if (event.key === "Escape") {
                              instance.close();
                          }
                      });
                  }
              }
          )
          modals.push(instance);
      });

      folioLinks.forEach(function(link, index) {
          link.addEventListener("click", function(event) {
              event.preventDefault();
              modals[index].show();
          });
      });

  };
  folioLightbox();

};
  ssLightbox();

// scroll
SmoothScroll({
    animationTime    : 800,
    stepSize         : 75,
    accelerationDelta : 30,  
    accelerationMax   : 2,   
    keyboardSupport   : true,  
    arrowScroll       : 50,
    pulseAlgorithm   : true,
    pulseScale       : 4,
    pulseNormalize   : 1,
    touchpadSupport   : true,
})

// goto
const ssMoveTo = function(){

  const easeFunctions = {
      easeInQuad: function (t, b, c, d) {
          t /= d;
          return c * t * t + b;
      },
      easeOutQuad: function (t, b, c, d) {
          t /= d;
          return -c * t* (t - 2) + b;
      },
      easeInOutQuad: function (t, b, c, d) {
          t /= d/2;
          if (t < 1) return c/2*t*t + b;
          t--;
          return -c/2 * (t*(t-2) - 1) + b;
      },
      easeInOutCubic: function (t, b, c, d) {
          t /= d/2;
          if (t < 1) return c/2*t*t*t + b;
          t -= 2;
          return c/2*(t*t*t + 2) + b;
      }
  }

  const triggers = document.querySelectorAll('.smoothscroll');
  
  const moveTo = new MoveTo({
      tolerance: 0,
      duration: 1300,
      easing: 'easeInOutCubic',
      container: window
  }, easeFunctions);

  triggers.forEach(function(trigger) {
      moveTo.registerTrigger(trigger);
  });

};
ssMoveTo();

// load home block
const loadBlock = document.querySelector('.video__container');
document.addEventListener('DOMContentLoaded', function () {
  loadBlock.scrollIntoView({
});
})

//mobile menu
var burgerMenu = document.getElementById('burger-menu');
var overlay = document.getElementById('menu');
burgerMenu.addEventListener('click', function(){
  this.classList.toggle("close");
  overlay.classList.toggle("overlay");
});

// color theme
function colorMode() {
  function addColor() {
    document.body.classList.toggle("_color-mode");
  }

  function setRemoveColor() {
    if (getColor()) {
      localStorage.removeItem("color--mode");
    } else {
      localStorage.setItem("color--mode", "val");
    }
  }

  function getColor() {
    return localStorage.getItem("color--mode");
  }

  if (getColor()) {
    addColor();
  }

  const colorButton = document.querySelectorAll(".color__mode");
  for (let i = 0; i < colorButton.length; i++) {
    colorButton[i].addEventListener("click", () => {
      setRemoveColor();
      addColor();
    });
  }
}
colorMode();

// mobi vibro v1
// let doVibro = Boolean(localStorage.getItem('doVibro') === '0' ? 0 : 1) || false;

// document.getElementById("vibro_on").addEventListener('click', () => {
//   switchVibro(true)
// });

// document.getElementById("vibro_off").addEventListener('click', () => {
//   switchVibro(false)
// });

// const list = document.getElementsByClassName('doVibro');

// for (let i = 0; i < list.length; i++) {
//     list[i].addEventListener('click', (e) => {
//       doVibro ? navigator.vibrate([8]) : navigator.vibrate([0]);
//      })
// }
// function switchVibro(bool) {
//   doVibro = Boolean(bool);
//   localStorage.setItem('doVibro', bool ? '1' : '0')
// }

// mobi vibro v2
function vibroMobile() {

  const vibro = document.querySelectorAll('.mobi-vibro');
  const media = matchMedia('(max-width: 767px)');
  
    if(media.matches) {
      for (let i = 0; i < vibro.length; i++) {
        vibro[i].addEventListener('click', (e) => {
        navigator.vibrate(3);
        });
      }
    }
  }

  vibroMobile();

