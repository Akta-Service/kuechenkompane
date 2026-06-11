
  // Initialize Swiper

  document.addEventListener("DOMContentLoaded", function(event) {
    const video_slider = new Swiper('.video_slider_active', {
      slidesPerView: 6,
      spaceBetween: 8,
      loop: false,
      navigation: {
        nextEl: '.video-next',
        prevEl: '.video-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          centeredSlides: true,
          loop: true,
        },
        700: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 6,
        },
      },
    });
  });

  