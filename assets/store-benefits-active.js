  const swiper = new Swiper('.store-benefits-active', {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  });