// Create and open the modal

function floowOpenModal(content) {
  const modal = document.querySelector(".floow-modal");

  if (!modal) {
    // If theres no modal container, create one and put it at the beginning of the body
    const modalText = `
      <div class="floow-modal">
        <div class="floow-modal-background" onclick="floowCloseModal();"></div>
        <div class="floow-modal-content-container">
          <svg 
            class="floow-modal-close"
            onclick="floowCloseModal()"
            role="presentation" stroke-width="2" focusable="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M17.658 6.343 6.344 17.657M17.658 17.657 6.344 6.343"></path>
          </svg>
          <div class="floow-modal-content"></div>
        </div>
      </div>  
      `;
    const modalHTML = new DOMParser().parseFromString(modalText, "text/html");
    const modalElement = modalHTML.body.querySelector(".floow-modal");
    document.body.prepend(modalElement);
  }

  // Put the content in the modal
  const modalContent = document.querySelector(".floow-modal-content");
  modalContent.innerHTML = content.innerHTML;

  // Open the modal
  document.querySelector(".floow-modal").setAttribute("open", "");
}

// Close the modal

function floowCloseModal() {
  document.querySelector(".floow-modal").removeAttribute("open");
}

// Money formatting



// Initialize slider

function floowInitializeSlider(settings, id) {
  const sliderId = id;
  const slider = document.querySelector(`.slider-${sliderId}`);
  const leftArrow = document.querySelector(`.left-arrow-${sliderId}`);
  const rightArrow = document.querySelector(`.right-arrow-${sliderId}`);
  const slides = Array.from(slider.children);
  let activeSlide = 0;

  slides.forEach((slide, i) => {
    slide.setAttribute("data-index", `${i}-${id}`); 
  });

  floowCalculateSlideWidth(slider, slides, settings, activeSlide, id);

  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      floowCalculateSlideWidth(slider, slides, settings, activeSlide, id);
    }
  });

  resizeObserver.observe(slider);

  function scrollToSlide(index) {
    const targetSlide = document.querySelector(`[data-index="${index}-${id}"]`);
    if (!targetSlide) return;

    slider.scrollTo({
      left: targetSlide.offsetLeft,
      behavior: "smooth"
    });
  }

  // Left arrow
  leftArrow.addEventListener("click", () => {
    if (activeSlide > 0) {
      activeSlide -= 1;
      rightArrow.classList.remove("floow-arrow-inactive");

      if (activeSlide == 0) leftArrow.classList.add("floow-arrow-inactive");

      scrollToSlide(activeSlide);
    }
  });

  // Right arrow
  rightArrow.addEventListener("click", () => {
    if (window.innerWidth > settings.mobile.width) {
      if (activeSlide < slides.length - settings.slidesPerView) activeSlide += 1;
      if (activeSlide == slides.length - settings.slidesPerView) rightArrow.classList.add("floow-arrow-inactive");
    } else {
      if (activeSlide < slides.length - settings.mobile.slidesPerView) activeSlide += 1;
      if (activeSlide == slides.length - settings.mobile.slidesPerView) rightArrow.classList.add("floow-arrow-inactive");
    }

    console.log(activeSlide);

    leftArrow.classList.remove("floow-arrow-inactive");
    scrollToSlide(activeSlide);
  });
}


// Calculate slide width depending on viewport
function floowCalculateSlideWidth(slider, slides, settings, activeSlide, id) {
  let sliderWidth = slider.getBoundingClientRect().width;
  let slideWidth;

  if (window.innerWidth > settings.mobile.width) {
    slideWidth = (sliderWidth - settings.gap * (settings.slidesPerView - 1)) / settings.slidesPerView;
    gap = settings.gap;
  } else {
    slideWidth = (sliderWidth - settings.mobile.gap * (settings.mobile.slidesPerView - 1)) / settings.mobile.slidesPerView;
    gap = settings.gapMobile;
  }

  slides.forEach((slide) => {
    slide.style.width = `${slideWidth}px`;
    slider.style.gap = `${gap}px`;
  });

  // horizontales Scrollen zum aktiven Slide
  const targetSlide = document.querySelector(`.block-${id}[data-index="${activeSlide}-${id}"]`);
  if (targetSlide) {
    slider.scrollTo({
      left: targetSlide.offsetLeft,
      behavior: "smooth"
    });
  }
}



async function floowChangeVariant(productId, event, atcText, soldOutText) {
  const container = event.target.closest(`.floow-variant-picker-wrapper[product-id="${productId}"]`);
  const productData = JSON.parse(document.getElementById(`product-data-${productId}`).textContent);

  // 1. Gewählte Optionen sammeln
  const selectedOptions = [];
  container.querySelectorAll('.floow-variant-picker-value:checked').forEach((el) => {
    selectedOptions.push(el.value.trim());
  });

  // 2. Passende Variante finden
  const variant = productData.variants.find(v => {
    return v.options.every((opt, i) => opt === selectedOptions[i]);
  });

  if (!variant) {
    console.warn("Keine Variante gefunden für", selectedOptions);
    return;
  }

  // 3. Bild aktualisieren
  const imgEl = container.querySelector('.floow-variant-picker-image');
  if (variant.featured_image) {
    imgEl.src = variant.featured_image.src;
    imgEl.alt = variant.featured_image.alt || '';
  }

  // 4. Preis aktualisieren
  const priceEl = container.querySelector('.floow-variant-picker-price');
  priceEl.textContent = floowFormatMoney(variant.price);

  // Compare-at Preis
  const compareEl = container.querySelector('.floow-variant-picker-compare-at-price');
  if (variant.compare_at_price && variant.compare_at_price > variant.price) {
    compareEl.style.display = 'inline';
    compareEl.textContent = floowFormatMoney(variant.compare_at_price);
  } else {
    compareEl.style.display = 'none';
  }

  // 5. Add-to-Cart Button aktualisieren
  const atc = container.querySelector('.floow-variant-picker-atc');
  if (variant.available) {
    atc.classList.remove('floow-variant-picker-disabled');
    atc.innerText = atcText;
    atc.onclick = () => {
      floowAddToCart(variant.id, 1, atc);
      floowCloseModal();
      floowOpenCart();
    };
  } else {
    atc.classList.add('floow-variant-picker-disabled');
    atc.innerText = soldOutText;
    atc.onclick = null;
  }

 productData.options.forEach((optionName, optionIndex) => {
  const optionPos = optionIndex + 1; // Shopify Position = 1-basiert

  const allValues = [...new Set(productData.variants.map(v => v.options[optionIndex]))];

  allValues.forEach(value => {
    const input = container.querySelector(
      `.floow-variant-radio-${optionPos}[value="${CSS.escape(value)}"]`
    );
    if (!input) return;

    const possibleVariant = productData.variants.find(v => {
      return v.options[optionIndex] === value &&
             v.options.every((opt, i) => i === optionIndex || opt === selectedOptions[i]) &&
             v.available;
    });

    if (possibleVariant) {
  input.closest('label').classList.remove('floow-variant-picker-disabled');
} else {
  input.closest('label').classList.add('floow-variant-picker-disabled');
}

  });
});

}

async function floowRequestSection(string) { 
  const url = `${window.location.origin}/${string}`;
  const response = await fetch(url);
  const htmlString = await response.text();
  const html = new DOMParser().parseFromString(htmlString, "text/html");
  return html;
}


async function floowAddToCart(id, quantity) {

  const formData = {
    items: [
      {
        id: id,
        quantity: quantity
      }
    ]
  };

  const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();
}

