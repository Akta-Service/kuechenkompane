document.addEventListener("DOMContentLoaded", () => {
  class BundleManager {
    constructor(bundleElement) {
      this.bundle = bundleElement;
      this.bundleNumber = this.bundle.dataset.bundle;
      this.addonStates = [];
      this.selectedVariants = {};

      // Use global hidden inputs container
      this.container = document.getElementById("hidden-inputs-container");

      this.init();
    }

    init() {
      this.updateVariantIdsForAllProducts();
      this.setupSelectChangeHandlers();
      this.setupAddonClickHandlers();

      // Set radio checked if active
      const radio = this.bundle.querySelector('input[type="radio"]');
      if (radio && this.bundle.classList.contains("active")) {
        radio.checked = true;
      }
    }

    updateVariantIdsForAllProducts() {
      // Dynamically find all unique product indices in the bundle
      const productIndices = Array.from(
        new Set(
          Array.from(this.bundle.querySelectorAll("select")).map((s) =>
            s.getAttribute("data-product-index")
          )
        )
      );
      productIndices.forEach((index) => this.updateVariantId(index));
    }

    findVariantIdByOptions(selectedOptionsArray) {
      return (
        window.productVariants.find((variant) =>
          selectedOptionsArray.every((val, idx) => {
            const variantOption = variant[`option${idx + 1}`];
            return variantOption === val;
          })
        )?.id || null
      );
    }

    updateVariantId(productIndex) {
      const selects = this.bundle.querySelectorAll(
        `select[data-bundle="${this.bundleNumber}"][data-product-index="${productIndex}"]`
      );

      const selectedOptions = Array.from(selects).map((sel) => sel.value);
      const variantId = this.findVariantIdByOptions(selectedOptions);
      this.selectedVariants[productIndex] = variantId;

      // Store all variants as JSON in a data attribute
      this.bundle.dataset.variants = JSON.stringify(this.selectedVariants);
    }

    getSelectedOptions() {
      const options = {};
      this.bundle.querySelectorAll("select").forEach((select) => {
        options[select.name] = select.value;
      });
      return options;
    }

    getCheckedAddons() {
      return Array.from(
        this.bundle.querySelectorAll(".addon-check:checked")
      ).map((checkbox) => ({
        productId: checkbox.getAttribute("data-product-id"),
        name: checkbox.nextElementSibling?.textContent.trim() || "",
      }));
    }

    collectPropertiesFromContainer() {
      const props = {};
      if (!this.container) return props;
      this.container.querySelectorAll("input[type=hidden]").forEach((input) => {
        if (input.name.startsWith("properties[")) {
          const match = input.name.match(/^properties\[(.+)\]$/);
          if (match) props[match[1]] = input.value;
        }
      });
      return props;
    }

    getCheckedAddonVariantIds() {
      return Array.from(this.bundle.querySelectorAll(".addon-check:checked"))
        .map((checkbox) => checkbox.getAttribute("data-product-id"))
        .filter(Boolean);
    }

    updateHiddenInputs() {
      if (!this.container) return;
      this.container.innerHTML = "";

      const selectedOptions = this.getSelectedOptions();
      const checkedAddons = this.getCheckedAddons();

      this.container.appendChild(
        this.createHiddenInput("properties[bundle]", this.bundleNumber)
      );
      this.container.appendChild(
        this.createHiddenInput("quantity", this.bundleNumber)
      );

      Object.entries(selectedOptions).forEach(([name, value]) => {
        this.container.appendChild(
          this.createHiddenInput(`properties[${name}]`, value)
        );
      });

      checkedAddons.forEach((addon, index) => {
        this.container.appendChild(
          this.createHiddenInput(
            `properties[addon_${index + 1}]`,
            addon.productId || addon.name
          )
        );
      });
    }

    createHiddenInput(name, value) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }

    syncData() {
      this.updateVariantIdsForAllProducts();
      this.updateHiddenInputs();
    }

    addToCart = async () => {
      if (!this.container) {
        console.error("Hidden inputs container not found");
        return;
      }

      const properties = this.collectPropertiesFromContainer();
      const addonVariantIds = this.getCheckedAddonVariantIds();

      // Count addon quantities grouped by variant id
      const addonQuantityMap = {};
      addonVariantIds.forEach((addonId) => {
        if (!addonQuantityMap[addonId]) addonQuantityMap[addonId] = 0;
        addonQuantityMap[addonId]++;
      });

      let items = [];

      // Loop over selected variants
      Object.values(this.selectedVariants).forEach((variantId) => {
        if (!variantId) {
          alert(
            "Please select valid variant options for all products in this bundle."
          );
          throw new Error("Invalid variant selected");
        }
        items.push({ id: variantId, quantity: 1 });
      });

      Object.entries(addonQuantityMap).forEach(([addonId, quantity]) => {
        items.push({ id: addonId, quantity: quantity });
      });

      await this.sendAddToCartRequest(items);
    };

    async sendAddToCartRequest(items) {
      try {
        const response = await fetch("/cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ items }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Add to cart failed:", errorData.description);
          alert("Failed to add to cart: " + errorData.description);
          return;
        }

        // Update cart UI if exists
        const cartDrawer = document.querySelector("m-cart-drawer");
        if (cartDrawer) {
          cartDrawer.onCartDrawerUpdate(true);
          cartDrawer.open();
        }
      } catch (err) {
        console.error("Error adding to cart:", err);
        alert("Error adding to cart.");
      }
    }

    setupSelectChangeHandlers() {
      this.bundle.querySelectorAll("select").forEach((select) => {
        select.addEventListener("change", () => {
          const productIndex = parseInt(
            select.getAttribute("data-product-index")
          );
          this.updateVariantId(productIndex);
          this.syncData();
        });
      });
    }

    setupAddonClickHandlers() {
      this.bundle.querySelectorAll(".addon").forEach((addon) => {
        addon.addEventListener("click", () => {
          const check = addon.querySelector(".addon-check");
          check.checked = !check.checked;

          const addonIndex = Array.from(addon.parentElement.children).indexOf(
            addon
          );
          this.addonStates[addonIndex] = check.checked;

          this.syncData();
        });
      });
    }
  }

  // Initialize all bundles
  const bundles = document.querySelectorAll(".bundle-option");
  const bundleManagers = [];

  bundles.forEach((bundleEl) => {
    bundleManagers.push(new BundleManager(bundleEl));
  });

  // Add To Cart buttons
  const addToCartButtons = document.querySelectorAll(".rs-add-btn.mrk-btn");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Find active bundle globally
      const activeBundle = document.querySelector(".bundle-option.active");
      if (!activeBundle) {
        alert("Please select a product bundle.");
        return;
      }

      // Find the bundle manager for active bundle
      const manager = bundleManagers.find((m) => m.bundle === activeBundle);
      if (manager) {
        manager.addToCart();
      }
    });
  });

  // Bundle selection click
  bundles.forEach((bundle) => {
    bundle.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("addon") &&
        !e.target.classList.contains("addon-check") &&
        !e.target.closest(".addon")
      ) {
        // Remove active class from all bundles
        bundles.forEach((b) => b.classList.remove("active"));
        // Add active class to clicked bundle
        bundle.classList.add("active");

        // Update radio checked
        const radio = bundle.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        // Sync data on active bundle manager
        const manager = bundleManagers.find((m) => m.bundle === bundle);
        if (manager) {
          manager.syncData();
        }
      }
    });
  });

  // Set initial active bundle (first one)
  if (bundles.length) {
    bundles[0].classList.add("active");
    const manager = bundleManagers[0];
    if (manager) {
      manager.syncData();
    }
  }
});
