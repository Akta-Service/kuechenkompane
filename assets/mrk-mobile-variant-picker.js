document.addEventListener("DOMContentLoaded", () => {
  const variantSelect = document.querySelector(
    '[data-picker-field="select"] select'
  );
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  if (!variantSelect || !swiperWrapper) return;

  // Parse the Liquid-injected variant-to-media ID map
  const variantMediaMap = JSON.parse(
    document.getElementById("variant-media-map").textContent
  );

  variantSelect.addEventListener("change", (event) => {
    const selectedVariantTitle = event.target.value;
    const mediaId = variantMediaMap[selectedVariantTitle];



    if (!mediaId) {
      console.warn("No media ID found for variant:", selectedVariantTitle);
      return;document.addEventListener("DOMContentLoaded", () => {
  const variantSelect = document.querySelector(
    '[data-picker-field="select"] select'
  );
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  if (!variantSelect || !swiperWrapper) return;

  // Parse the Liquid-injected variant-to-media ID map
  const variantMediaMap = JSON.parse(
    document.getElementById("variant-media-map").textContent
  );

  variantSelect.addEventListener("change", (event) => {
    const selectedVariantTitle = event.target.value;
    const mediaId = variantMediaMap[selectedVariantTitle];



    if (!mediaId) {
      console.warn("No media ID found for variant:", selectedVariantTitle);
      return;
    }

    const matchingSlide = Array.from(swiperWrapper.children).find(
      (slide) => slide.getAttribute("data-media-id") === String(mediaId)
    );

    if (matchingSlide) {
  

      const index = Array.from(swiperWrapper.children).indexOf(matchingSlide);


      document.querySelectorAll('.m-main-product--wrapper .swiper-container').forEach(container => {
        const swiperInstance = container.swiper; // get the Swiper instance from the container

        if (swiperInstance && matchingSlide) {
          swiperInstance.slideTo(index); // go to the matched slide
        } else {
          console.warn("Swiper instance not found or no matching slide.");
        }
      });
    } else {
      console.warn(" No matching slide found for media ID:", mediaId);
    }
  });
});

    }

    const matchingSlide = Array.from(swiperWrapper.children).find(
      (slide) => slide.getAttribute("data-media-id") === String(mediaId)
    );

    if (matchingSlide) {
  

      const index = Array.from(swiperWrapper.children).indexOf(matchingSlide);


      document.querySelectorAll('.m-main-product--wrapper .swiper-container').forEach(container => {
        const swiperInstance = container.swiper; // get the Swiper instance from the container

        if (swiperInstance && matchingSlide) {
          swiperInstance.slideTo(index); // go to the matched slide
        } else {
          console.warn("Swiper instance not found or no matching slide.");
        }
      });
    } else {
      console.warn(" No matching slide found for media ID:", mediaId);
    }
  });
});
