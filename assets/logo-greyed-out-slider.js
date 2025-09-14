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
});