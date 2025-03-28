window.cart_cross_sell_swiper = () => {
  if (document.querySelector(".ccs-swiper")) {
    new Swiper(".ccs-swiper", {
      slidesPerView: 2.2,
      spaceBetween: 0,
      loop: true,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2.2,
        },
      },
    });
  } else {
    console.log("ccs swiper element not found");
  }
};

document.addEventListener("DOMContentLoaded", (e) => {
  cart_cross_sell_swiper();
});
