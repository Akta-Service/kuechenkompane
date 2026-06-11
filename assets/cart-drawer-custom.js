window.cart_cross_sell_splide = function() {
  var el = document.querySelector('.ccs-splide');
  if (el) {
    new Splide(el, {
      perPage     : 2,
      perMove     : 1,
      gap         : 0,
      pagination  : false,
      arrows      : true,
      drag        : true,
      rewind      : true,
      breakpoints : {
        600: { perPage: 1 },
      },
    }).mount();
  }
};

document.addEventListener('DOMContentLoaded', function() {
  cart_cross_sell_splide();
});