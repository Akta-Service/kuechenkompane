document.addEventListener('DOMContentLoaded', function () {
  var sliders = document.querySelectorAll('.banner-area-slider');
  sliders.forEach(function (slider) {
    new Splide(slider, {
      type: 'loop',
      arrows: true,
    }).mount();
  });
});
