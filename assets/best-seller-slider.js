<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function(event) {
    const swiper_best_salling = new Swiper('.best-seller-item', {
      slidesPerView: 6,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
          loop: true,
        },
        576: {
          slidesPerView: 3,
          loop: true,
        },
        991: {
          slidesPerView: 4,
        },
      },
    });
=======
document.addEventListener("DOMContentLoaded", function(event) {
    const swiper_best_salling = new Swiper('.best-seller-item', {
      slidesPerView: 6,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
          loop: true,
        },
        576: {
          slidesPerView: 3,
          loop: true,
        },
        991: {
          slidesPerView: 4,
        },
      },
    });
>>>>>>> 727904ae2a03b5daa0b63a32aad8464d0c19913d
});