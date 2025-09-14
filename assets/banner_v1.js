document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.banner-area-slider', {
      loop: true,
      navigation: {
        nextEl: '.banner-next',
        prevEl: '.banner-prev',
      },
    });
});