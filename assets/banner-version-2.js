document.addEventListener("DOMContentLoaded", function(event) {
const swiper = new Swiper('.banner-top-active', {
    loop: true,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  });  