// Utility functions

const showToast = (message, type = 'info', duration = 3000) => {
  const container =
    document.getElementById('toast-container') ||
    (() => {
      const div = document.createElement('div');
      div.id = 'toast-container';
      div.className = 'toast-container';
      document.body.appendChild(div);
      return div;
    })();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  }[type] || 'ℹ';

  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

const formatCurrency = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const showLoading = (element) => {
  element.innerHTML = '<div class="loading"><div class="spinner"></div> Loading...</div>';
};

const showEmpty = (element, message = 'No items found') => {
  element.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">📭</div>
      <h2>${message}</h2>
      <p>Try adjusting your search or filters</p>
    </div>
  `;
};

const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return error.message || 'An error occurred';
};

const buildUnsplashPhotoUrl = (keywords, width = 400, height = 300) => {
  const normalized = (keywords || 'product')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ',')
    .replace(/(^,|,$)/g, '')
    .slice(0, 180);

  const query = normalized || 'product';
  return `https://source.unsplash.com/featured/${width}x${height}/?${query}`;
};

const hashToPositiveInt = (value) => {
  const str = (value || '').toString();
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const buildLoremFlickrPhotoUrl = (keywords, width = 400, height = 300, lock = 1) => {
  const normalized = (keywords || 'product')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ',')
    .replace(/(^,|,$)/g, '')
    .slice(0, 180);

  const query = normalized || 'product';
  return `https://loremflickr.com/${width}/${height}/${query}?lock=${lock}`;
};

const getFallbackImageUrl = (title = '', category = '') => {
  const combined = [category, title].filter(Boolean).join(' ');
  return buildUnsplashPhotoUrl(combined, 400, 300);
};

const getBackupFallbackImageUrl = (title = '', category = '') => {
  const combined = [category, title].filter(Boolean).join(' ');
  const lock = (hashToPositiveInt(combined) % 5000) + 1;
  return buildLoremFlickrPhotoUrl(combined, 400, 300, lock);
};

const inferCategoryFromImageContext = (img) => {
  const fromCard = img.closest('.product-card')?.querySelector('.product-category')?.textContent?.trim();
  if (fromCard) return fromCard;

  const fromDetails = img.closest('.product-details')?.querySelector('.details-category')?.textContent?.trim();
  if (fromDetails) return fromDetails;

  return '';
};

const enableProductImageFallbacks = () => {
  if (window.__campusCartImageFallbacksEnabled) return;
  window.__campusCartImageFallbacksEnabled = true;

  document.addEventListener(
    'error',
    (event) => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement)) return;

      const isProductImage =
        img.classList?.contains('product-image') || img.classList?.contains('details-image');
      if (!isProductImage) return;

      const stage = Number(img.dataset.fallbackStage || '0');
      if (stage >= 2) return;

      const title = img.alt || '';
      const category = inferCategoryFromImageContext(img);

      if (stage === 0) {
        img.dataset.fallbackStage = '1';
        img.src = getFallbackImageUrl(title, category);
        return;
      }

      img.dataset.fallbackStage = '2';
      img.src = getBackupFallbackImageUrl(title, category);
    },
    true
  );
};

enableProductImageFallbacks();
