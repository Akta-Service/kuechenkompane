<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function(event) {
    const swiper_logo = new Swiper('.logo-greyed-out-slider', {
        slidesPerView: 6,
        centeredSlides: true,
        loop: true,
        spaceBetween: 5,
        grabCursor: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false, 
      },
      breakpoints: {
        0: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 5,
        },
      },
    });
=======
document.addEventListener("DOMContentLoaded", function(event) {
    const swiper_logo = new Swiper('.logo-greyed-out-slider', {
        slidesPerView: 6,
        centeredSlides: true,
        loop: true,
        spaceBetween: 5,
        grabCursor: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false, 
      },
      breakpoints: {
        0: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 6,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 5,
        },
      },
    });
>>>>>>> 727904ae2a03b5daa0b63a32aad8464d0c19913d
});