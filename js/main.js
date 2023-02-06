"use strict";

// home
window.addEventListener("load", windowLoad);
function windowLoad() {
  document.body.classList.add("loaded");

  if (document.querySelector(".main-slider")) {
    new Swiper(".main-slider", {
      speed: 2000,
      effect: "fade",
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: ".bullets__items",
        type: "bullets",
        clickable: "true",
      },
    });
  }
  document.addEventListener("click", documentActions);
  function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.closest(".nav-popular__item")) {
      const tabNavItem = targetElement.closest(".nav-popular__item");
      if (!tabNavItem.classList.contains("active")) {
        const activeTabNavItem = document.querySelector(
          ".nav-popular__item.active"
        );
        activeTabNavItem.classList.remove("active");
        tabNavItem.classList.add("active");

        const tabItems = document.querySelectorAll(".popular__tab");
        const activeTabItem = document.querySelector(".popular__tab.active");

        activeTabItem.classList.remove("active");
        tabItems[getIndex(tabNavItem)].classList.add("active");
      }
    }
  }

  function getIndex(el) {
    return Array.from(el.parentNode.children).indexOf(el);
  }

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
  let toUp = document.querySelector(".to-up");

  window.onscroll = function () {
    if (window.pageYOffset > 350) {
      toUp.style.display = "block";
    } else {
      toUp.style.display = "none";
    }
  };

  toUp.addEventListener("click", function () {
    window.scrollBy({
      top: -document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });
});

//load animation
function onLoadPage() {
  window.addEventListener('load', () => {
    document.documentElement.add('loaded');
  });
}
