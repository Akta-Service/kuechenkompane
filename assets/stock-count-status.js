
  document.addEventListener('DOMContentLoaded', function () {
    (function () {
      // === SETTINGS ===
      const MIN_RANDOM = 5;
      const MAX_RANDOM = 70;
      const DROP_INTERVAL = 60000; // 1 minute (10000 = 10s for testing)

      function getRandomStock() {
        return Math.floor(Math.random() * (MAX_RANDOM - MIN_RANDOM + 1)) + MIN_RANDOM;
      }

      function getStoredStocks() {
        return JSON.parse(localStorage.getItem('productStocks')) || {};
      }

      function setStoredStocks(stocks) {
        localStorage.setItem('productStocks', JSON.stringify(stocks));
      }

      function getProductStock(productId, initialStock) {
        let stocks = getStoredStocks();
        if (initialStock && !isNaN(initialStock)) {
          stocks[productId] = parseInt(initialStock, 10);
          setStoredStocks(stocks);
          return stocks[productId];
        }
        if (!stocks[productId]) {
          stocks[productId] = getRandomStock();
          setStoredStocks(stocks);
        }
        return stocks[productId];
      }

      function setProductStock(productId, value) {
        let stocks = getStoredStocks();
        stocks[productId] = value;
        setStoredStocks(stocks);
      }

      function getStatusClass(stock) {
        if (stock < 10) return 'stock-low';
        if (stock >= 10 && stock < 50) return 'stock-limited';
        return 'stock-instock';
      }

      function renderStock(el, stock) {
        const countEl = el.querySelector('.stock-count');
        const pEl = el.querySelector('.stock_status_text');
        if (countEl) countEl.textContent = stock + ' Stück auf Lager';
        if (pEl) pEl.className = 'stock_status_text ' + getStatusClass(stock);
      }

      // Render
      document.querySelectorAll('.product--stock-count').forEach((el) => {
        const productId = el.dataset.productId;
        const initialStock = el.dataset.stock;
        const stock = getProductStock(productId, initialStock);

        renderStock(el, stock);

        // Auto drop only on product template
        if (window.isProductPage) {
          setInterval(() => {
            let current = getProductStock(productId, initialStock);

            if (current > 5) {
              // keep dropping
              current--;
            } else {
              // reset to new random (5–70)
              current = getRandomStock();
            }

            setProductStock(productId, current);
            renderStock(el, current);
          }, DROP_INTERVAL);
        }
      });
    })();
  });
