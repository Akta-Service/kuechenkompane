 document.addEventListener('DOMContentLoaded', function () {
    const headingSwiper = new Swiper('.image-slide__active', {
      slidesPerView: 'auto',
      spaceBetween: 30,
      speed: 8000,
      loop: true,
      freeMode: true,
      autoplay: {
        delay: 0,
        reverseDirection: false,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        375: {
          slidesPerView: 1.4,
          spaceBetween: 20,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1440: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      },
    });
  });