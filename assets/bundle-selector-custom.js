
  class ProductVariantSelector {
    constructor(container) {
      this.container = container;
      this.radios = container.querySelectorAll('input[name="variant_or_custom"]');
      this.dropdownContainer = container.querySelector('.product-radio-option.option-dropdown');
      this.dropdownRadio = this.dropdownContainer ? this.dropdownContainer.querySelector('input[type="radio"]') : null;
      this.dropdown = this.dropdownContainer ? this.dropdownContainer.querySelector('.custom-product-dropdown') : null;
      this.hiddenInput = container.querySelector('#selectedVariantId');
      this.addToCartBtn = container.querySelector('.btn.add-btn-custom');

      // Price display elements
      this.priceValue = container.querySelector('.selected-variant-price .price-value');
      this.comparePrice = container.querySelector('.selected-variant-price .dp-p-compare-price');

      this.init();
    }

    init() {
      this.setupRadios();
      this.setupDropdown();
      this.updateInitialState();
      this.setupAddToCart();
    }

    // Show/hide dropdown options
    setDropdownVisibility(show) {
      if (!this.dropdownContainer) return;
      const list = this.dropdownContainer.querySelector('.custom-products-list');
      if (list) list.style.display = show ? 'block' : 'none';
    }

    setupRadios() {
      this.radios.forEach((radio) => {
        radio.addEventListener('change', () => {
          const isDropdownRadio = radio === this.dropdownRadio;

          if (isDropdownRadio && this.dropdown) {
            // Dropdown radio clicked → show dropdown
            this.setDropdownVisibility(true);
            this.dropdownRadio.value = this.dropdown.value;
            this.hiddenInput.value = this.dropdown.value;
            this.updateActive(this.dropdown.value);
            this.updateVariant(this.dropdown.value);
          } else {
            // Normal variant radio
            this.setDropdownVisibility(false);
            this.hiddenInput.value = radio.value;
            this.updateActive(radio.value);
            this.updateVariant(radio.value);
          }
        });
      });
    }

    setupDropdown() {
      if (!this.dropdown) return;

      const updateDropdown = () => {
        const selectedId = this.dropdown.value;
        this.hiddenInput.value = selectedId;

        // Check the dropdown radio
        if (this.dropdownRadio) {
          this.radios.forEach((r) => (r.checked = false));
          this.dropdownRadio.checked = true;
          this.dropdownRadio.value = selectedId;
        }

        this.setDropdownVisibility(true);
        this.updateActive(selectedId);
        this.updateVariant(selectedId);
      };

      this.dropdown.addEventListener('change', updateDropdown);
    }

    updateActive(selectedId) {
      this.radios.forEach((r) => {
        const label = r.closest('.product-radio-option');
        if (r.value === selectedId) {
          r.checked = true;
          label.classList.add('active');
        } else {
          label.classList.remove('active');
        }
      });
    }

    updateVariant(selectedId) {
      // Media swap
      const media = document.querySelector(`[data-variant-id="${selectedId}"]`);
      if (media) {
        document.querySelectorAll('.product-media-item').forEach((el) => (el.style.display = 'none'));
        media.style.display = 'block';
      }

      // Get selected element: option first, then radio
      const selectedElement =
        this.container.querySelector(`option[value="${selectedId}"]`) ||
        this.container.querySelector(`input[value="${selectedId}"]`);

      if (!selectedElement) return;

      const available = selectedElement.dataset.available === 'true';
      const price = selectedElement.dataset.price || '';
      const compare = selectedElement.dataset.compare || '';

      // Update Add to cart button
      if (!available) {
        this.addToCartBtn.disabled = true;
        this.addToCartBtn.textContent = 'Sold Out';
        this.addToCartBtn.classList.add('btn-disabled');
      } else {
        this.addToCartBtn.disabled = false;
        this.addToCartBtn.textContent = 'Add to cart';
        this.addToCartBtn.classList.remove('btn-disabled');
      }

      // Update price display
      if (this.priceValue && this.comparePrice) {
        this.priceValue.textContent = price;
        if (compare && compare !== '' && compare !== price) {
          this.comparePrice.textContent = compare;
          this.comparePrice.style.display = 'inline';
        } else {
          this.comparePrice.textContent = '';
          this.comparePrice.style.display = 'none';
        }
      }
    }

    updateInitialState() {
      // Determine initial variant
      let initialId = '';
      const checkedRadio = this.container.querySelector('input[name="variant_or_custom"]:checked');

      if (checkedRadio) {
        initialId = checkedRadio.value;
      } else if (this.dropdown) {
        initialId = this.dropdown.value;
        if (this.dropdownRadio) this.dropdownRadio.checked = true;
      }

      this.hiddenInput.value = initialId;
      this.setDropdownVisibility(this.dropdownRadio && this.dropdownRadio.checked);
      this.updateActive(initialId);
      this.updateVariant(initialId);
    }

    setupAddToCart() {
      if (!this.addToCartBtn) return;
      this.addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const variantId = this.hiddenInput.value;
        if (!variantId) return console.warn('No variant selected!');

        const selectedElement =
          this.container.querySelector(`option[value="${variantId}"]`) ||
          this.container.querySelector(`input[value="${variantId}"]`);

        const available = selectedElement?.dataset?.available === 'true';
        if (!available) return console.warn('Selected variant is sold out!');

        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: variantId, quantity: 1 }] }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('Added to cart:', data);
            const cartDrawer = document.querySelector('m-cart-drawer');
            if (cartDrawer) {
              cartDrawer.onCartDrawerUpdate(true);
              cartDrawer.open();
            }
          })
          .catch((err) => console.error('Error adding to cart:', err));
      });
    }
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product-radio-options').forEach((container) => {
      new ProductVariantSelector(container);
    });
  });

