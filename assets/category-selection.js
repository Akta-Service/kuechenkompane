  document.addEventListener('DOMContentLoaded', () => {
    const swiper_categroy_active = new Swiper('.category-slider_active', {
      slidesPerView: 2,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        50: {
          slidesPerView: 3.5,
        },
        500: {
          slidesPerView: 3.5,
        },
        768: {
          slidesPerView: 4.5,
        },
        1024: {
          slidesPerView: 5,
        },
      },
    });
  });
 