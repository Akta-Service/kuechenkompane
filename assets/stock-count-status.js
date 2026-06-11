


  // document.addEventListener('DOMContentLoaded', function () {
  //   (function () {
  //     // === SETTINGS ===
  //     const MIN_RANDOM = 5;
  //     const MAX_RANDOM = 70;
  //     const DROP_INTERVAL = 60000; // 1 minute

  //     function getRandomStock() {
  //       return Math.floor(Math.random() * (MAX_RANDOM - MIN_RANDOM + 1)) + MIN_RANDOM;
  //     }

  //     function getStoredStocks() {
  //       return JSON.parse(localStorage.getItem('productStocks')) || {};
  //     }

  //     function setStoredStocks(stocks) {
  //       localStorage.setItem('productStocks', JSON.stringify(stocks));
  //     }

  //     function getProductStock(productId, initialStock) {
  //       let stocks = getStoredStocks();
  //       if (initialStock && !isNaN(initialStock)) {
  //         stocks[productId] = parseInt(initialStock, 10);
  //         setStoredStocks(stocks);
  //         return stocks[productId];
  //       }
  //       if (!stocks[productId]) {
  //         stocks[productId] = getRandomStock();
  //         setStoredStocks(stocks);
  //       }
  //       return stocks[productId];
  //     }

  //     function setProductStock(productId, value) {
  //       let stocks = getStoredStocks();
  //       stocks[productId] = value;
  //       setStoredStocks(stocks);
  //     }

  //     function getStatusClass(stock) {
  //       if (stock < 10) return 'stock-low';
  //       if (stock >= 10 && stock < 50) return 'stock-limited';
  //       return 'stock-instock';
  //     }

  //     function renderStock(el, stock) {
  //       const countEl = el.querySelector('.stock-count');
  //       const pEl = el.querySelector('.stock_status_text');
  //       const bubble = el.querySelector('.status-bubble');
  //       const available = el.dataset.available === "true";
  //       const isProduct = !!window.isProductPage;

  //       // OUT OF STOCK
  //       if (!available) {
  //         if (isProduct) {
  //           // Product page: show AUSVERKAUF + red bubble (use stock-low styles)
  //           if (countEl) countEl.textContent = 'AUSVERKAUF';
  //           el.classList.add('stock-out');
           
  //           if (pEl) {
  //             pEl.classList.remove('stock-limited', 'stock-instock');
  //             pEl.classList.add('stock-out', 'stock-low');
  //           }
            
  //         } else {
  //           // Collection / non-product page: add collection class so CSS can hide it
           
  //           if (countEl) countEl.textContent = 'AUSVERKAUF';
  //           el.classList.add('stock-out', 'collection-stock-out');
  //           if (pEl) {
  //             pEl.classList.remove('stock-limited', 'stock-instock', 'stock-low');
  //             pEl.classList.add('stock-out', 'stock-low');
  //           }
            
  //         }
  //         return;
  //       }

  //       // IN STOCK — normal behavior
  //       if (countEl) countEl.textContent = stock + ' ';
  //       if (pEl) {
  //         pEl.className = 'stock_status_text ' + getStatusClass(stock);
  //       }
  //     }

  //     // Render
  //     document.querySelectorAll('.product--stock-count').forEach((el) => {
  //       const productId = el.dataset.productId;
  //       const initialStock = el.dataset.stock;
  //       const stock = getProductStock(productId, initialStock);

  //       renderStock(el, stock);

  //       // Auto drop only on product template and only if product is available
  //       if (window.isProductPage && el.dataset.available === "true") {
  //         setInterval(() => {
  //           let current = getProductStock(productId, initialStock);

  //           if (current > 5) {
  //             current--;
  //           } else {
  //             current = getRandomStock();
  //           }

  //           setProductStock(productId, current);
  //           renderStock(el, current);
  //         }, DROP_INTERVAL);
  //       }
  //     });
  //   })();
  // });



  


  // document.addEventListener('DOMContentLoaded', function () {
  //   (function () {
  //     // === SETTINGS ===
  //     const MIN_RANDOM = 5;
  //     const MAX_RANDOM = 70;
  //     const DROP_INTERVAL = 60000; // 1 minute

  //     function getRandomStock() {
  //       return Math.floor(Math.random() * (MAX_RANDOM - MIN_RANDOM + 1)) + MIN_RANDOM;
  //     }

  //     function getStoredStocks() {
  //       return JSON.parse(localStorage.getItem('productStocks')) || {};
  //     }

  //     function setStoredStocks(stocks) {
  //       localStorage.setItem('productStocks', JSON.stringify(stocks));
  //     }

  //     function getProductStock(productId, initialStock) {
  //       let stocks = getStoredStocks();
  //       if (initialStock && !isNaN(initialStock)) {
  //         stocks[productId] = parseInt(initialStock, 10);
  //         setStoredStocks(stocks);
  //         return stocks[productId];
  //       }
  //       if (!stocks[productId]) {
  //         stocks[productId] = getRandomStock();
  //         setStoredStocks(stocks);
  //       }
  //       return stocks[productId];
  //     }

  //     function setProductStock(productId, value) {
  //       let stocks = getStoredStocks();
  //       stocks[productId] = value;
  //       setStoredStocks(stocks);
  //     }

  //     function getStatusClass(stock) {
  //       if (stock < 10) return 'stock-low';
  //       if (stock >= 10 && stock < 50) return 'stock-limited';
  //       return 'stock-instock';
  //     }

  //     function renderStock(el, stock) {
  //       const countEl = el.querySelector('.stock-count');
  //       const pEl = el.querySelector('.stock_status_text');
  //       const bubble = el.querySelector('.status-bubble');
  //       const available = el.dataset.available === "true";
  //       const isProduct = !!window.isProductPage;

  //       // OUT OF STOCK
  //       if (!available) {
  //         if (isProduct) {
  //           // Product page: show AUSVERKAUF + red bubble (use stock-low styles)
  //           if (countEl) countEl.textContent = 'AUSVERKAUF';
  //           el.classList.add('stock-out');
           
  //           if (pEl) {
  //             pEl.classList.remove('stock-limited', 'stock-instock');
  //             pEl.classList.add('stock-out', 'stock-low');
  //           }
            
  //         } else {
  //           // Collection / non-product page: add collection class so CSS can hide it
           
  //           if (countEl) countEl.textContent = 'AUSVERKAUF';
  //           el.classList.add('stock-out', 'collection-stock-out');
  //           if (pEl) {
  //             pEl.classList.remove('stock-limited', 'stock-instock', 'stock-low');
  //             pEl.classList.add('stock-out', 'stock-low');
  //           }
            
  //         }
  //         return;
  //       }

  //       // IN STOCK — normal behavior
  //       if (countEl) countEl.textContent = stock + ' ';
  //       if (pEl) {
  //         pEl.className = 'stock_status_text ' + getStatusClass(stock);
  //       }
  //     }

  //     // Render
  //     document.querySelectorAll('.product--stock-count').forEach((el) => {
  //       const productId = el.dataset.productId;
  //       const initialStock = el.dataset.stock;
  //       const stock = getProductStock(productId, initialStock);

  //       renderStock(el, stock);

  //       // Auto drop only on product template and only if product is available
  //       if (window.isProductPage && el.dataset.available === "true") {
  //         setInterval(() => {
  //           let current = getProductStock(productId, initialStock);

  //           if (current > 5) {
  //             current--;
  //           } else {
  //             current = getRandomStock();
  //           }

  //           setProductStock(productId, current);
  //           renderStock(el, current);
  //         }, DROP_INTERVAL);
  //       }
  //     });
  //   })();
  // });


(function () {
  const MIN_RANDOM = 400;
  const MAX_RANDOM = 800;
  const DROP_INTERVAL = 60000;
  const MEDIUM_THRESHOLD = 500; // < 500 → orange, >= 500 → green
  const STORAGE_KEY = 'productStocks';

  let stocksCache = null;
  const initialized = new WeakSet();

  function getRandomStock() {
    return Math.floor(Math.random() * (MAX_RANDOM - MIN_RANDOM + 1)) + MIN_RANDOM;
  }

  function getStoredStocks() {
    if (stocksCache !== null) return stocksCache;
    try {
      stocksCache = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      stocksCache = {};
    }
    return stocksCache;
  }

  function setStoredStocks(stocks) {
    stocksCache = stocks;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks));
    } catch (e) {}
  }

  function getProductStock(productId, initialStock) {
    const stocks = getStoredStocks();
    if (initialStock && !isNaN(initialStock) && String(initialStock).trim() !== '') {
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
    const stocks = getStoredStocks();
    stocks[productId] = value;
    setStoredStocks(stocks);
  }

  // 2 states for in-stock products: orange (1–499) or green (500+)
  function getStatusClass(stock) {
    if (stock < MEDIUM_THRESHOLD) return 'stock-limited';
    return 'stock-instock';
  }

  // Metafield override — only orange or green (red is auto-handled via sold-out)
  function getStatusClassFromColor(color) {
    if (!color) return null;
    const c = String(color).toLowerCase().trim();
    if (c.startsWith('orange')) return 'stock-limited';
    if (c.startsWith('green')) return 'stock-instock';
    return null;
  }

  function getStatusText(el, statusClass) {
    if (statusClass === 'stock-low') return el.dataset.textUnavailable || 'Derzeit ausverkauft';
    if (statusClass === 'stock-limited') return el.dataset.textLimited || 'Nur noch wenige verfügbar';
    if (statusClass === 'stock-instock') return el.dataset.textInstock || 'Auf Lager - Sofort lieferbar';
    return '';
  }

  function renderStock(el, stock) {
    const pEl = el.querySelector('.stock_status_text');
    const innerEl = el.querySelector('.stock_status_text_inner');
    const available = el.dataset.available === 'true';
    const isProduct = !!window.isProductPage;

    // SOLD OUT → red
    if (!available) {
      el.classList.add('stock-out');
      if (!isProduct) el.classList.add('collection-stock-out');
      if (pEl) {
        pEl.classList.remove('stock-limited', 'stock-instock');
        pEl.classList.add('stock-out', 'stock-low');
      }
      if (innerEl) {
        innerEl.textContent = el.dataset.textUnavailable || 'Derzeit ausverkauft';
      }
      return;
    }

    // IN STOCK — metafield override wins over calculated stock
    const overrideClass = getStatusClassFromColor(el.dataset.colorOverride);
    const statusClass = overrideClass || getStatusClass(stock);

    if (pEl) {
      pEl.className = 'stock_status_text ' + statusClass;
    }
    if (innerEl) {
      innerEl.textContent = getStatusText(el, statusClass);
    }
  }

  function initStockCount(scope) {
    const root = scope && scope.querySelectorAll ? scope : document;
    root.querySelectorAll('.product--stock-count').forEach((el) => {
      if (initialized.has(el)) return;
      initialized.add(el);

      const productId = el.dataset.productId;
      const initialStock = el.dataset.stock;
      const stock = getProductStock(productId, initialStock);

      renderStock(el, stock);

      const hasColorOverride = !!getStatusClassFromColor(el.dataset.colorOverride);

      if (window.isProductPage && el.dataset.available === 'true' && !hasColorOverride) {
        setInterval(() => {
          let current = getProductStock(productId, initialStock);
          if (current > 5) {
            current--;
          } else {
            current = getRandomStock();
          }
          setProductStock(productId, current);
          renderStock(el, current);
        }, DROP_INTERVAL);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initStockCount(document));
  } else {
    initStockCount(document);
  }

  document.addEventListener('shopify:section:load', (e) => initStockCount(e.target));
  document.addEventListener('shopify:block:select', (e) => initStockCount(e.target));
  document.addEventListener('shopify:section:select', (e) => initStockCount(e.target));
})();