require("../modules/polyfills")();
require("../modules/menu")();
require("../modules/lazyLoad")();
let Swiper = require("../lib/swiper");

import(
  /* webpackPrefetch: true, webpackChunkName: "footer" */ "../modules/footer"
).then((module) => {
  module.default();
});

import "../../scss/global";
import "../../scss/pages/home/page";

//services slider

let slidesPerView, gap;

calcSlider();

let servicesSlider = new Swiper(".services-slider", {
  slidesPerView: slidesPerView,
  spaceBetween: gap,
  autoHeight: true,
  speed: 2000,
  grabCursor: true,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
});

window.addEventListener("resize", () => {
  calcSlider();
  updateSlider();
});

function calcSlider() {
  let maxSlideWidth = (window.innerHeight * 0.9) / 3,
    amount = window.innerWidth / maxSlideWidth;

  slidesPerView = Math.trunc(amount);
  gap = ((amount - slidesPerView) * maxSlideWidth) / (slidesPerView - 1);

  if (slidesPerView <= 1) {
    slidesPerView = 2;
    gap = 0;
  }
}

function updateSlider() {
  servicesSlider.params.slidesPerView = slidesPerView;
  servicesSlider.params.spaceBetween = gap;
  servicesSlider.params.loop = true;
  servicesSlider.params.autoplay = {
    delay: 2000,
  };
  servicesSlider.params.speed = 2000;
}

let portfolioSlider = new Swiper(".portfolio-slider", {
  grabCursor: true,
  speed: 700,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".portfolio-pagination",
    clickable: true,
  },
});
