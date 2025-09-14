document.addEventListener("DOMContentLoaded", function(event) {

const swiper_trush = new Swiper('.trustpilot-testimonials', {
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      580: {
        slidesPerView: 2,
      },
      888: {
        slidesPerView: 3,
      },
      1108: {
        slidesPerView: 4,
      },
      1344: {
        slidesPerView: 5,
      },
    },
  });
  });