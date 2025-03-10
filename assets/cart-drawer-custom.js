window.cart_cross_sell_swiper = () => {
  new Swiper(".ccs-swiper", {
    slidesPerView: 2.2,
    spaceBetween: 0,
    loop: true,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};
document.addEventListener("DOMContentLoaded", (e) => {
  cart_cross_sell_swiper();
});
