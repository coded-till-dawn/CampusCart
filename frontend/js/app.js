// Main app logic for marketplace

let allProducts = [];
let currentFilters = {
  category: '',
  sort: '',
  search: '',
};

const initApp = () => {
  setupEventListeners();
  loadProducts();
};

const setupEventListeners = () => {
  // Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 500));
  }

  // Category select
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleCategoryChange);
  }

  // Sort
  const sortFilter = document.getElementById('sortFilter');
  if (sortFilter) {
    sortFilter.addEventListener('change', handleSortChange);
  }

  // Category buttons
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', handleCategoryButtonClick);
  });
};

const loadProducts = async () => {
  const container = document.getElementById('productsContainer');
  if (!container) return;

  showLoading(container);

  try {
    allProducts = await itemsAPI.getAll(
      currentFilters.category,
      currentFilters.sort,
      currentFilters.search
    );
    displayProducts(allProducts, container);
  } catch (error) {
    console.error('Error loading products:', error);
    showToast(getErrorMessage(error), 'error');
    showEmpty(container);
  }
};

const displayProducts = (items, container) => {
  if (items.length === 0) {
    showEmpty(container, 'No products found');
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="product-card">
      <div class="product-image-container">
        <img src="${item.image}" alt="${item.title}" class="product-image" />
        <button class="wishlist-btn" onclick="toggleWishlistFromCard(event, '${item._id}')">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <span class="product-category">${item.category}</span>
        <h3 class="product-title">${item.title}</h3>
        <div class="product-location">
          <i class="fas fa-map-marker-alt"></i> ${item.location}
        </div>
        <div class="product-seller">${item.sellerName}</div>
        <div class="product-price">${formatCurrency(item.price)}</div>
        <div class="product-actions">
          <button class="btn-primary" onclick="viewProduct('${item._id}')">
            <i class="fas fa-eye"></i> View
          </button>
          <button class="btn-secondary" onclick="toggleWishlist('${item._id}')">
            <i class="fas fa-heart"></i> Save
          </button>
        </div>
      </div>
    </div>
  `).join('');

  updateWishlistButtons();
};

const handleSearch = () => {
  const searchInput = document.getElementById('searchInput');
  currentFilters.search = searchInput.value.trim();
  loadProducts();
};

const handleCategoryChange = (e) => {
  currentFilters.category = e.target.value;
  updateCategoryButtons(e.target.value);
  loadProducts();
};

const handleSortChange = (e) => {
  currentFilters.sort = e.target.value;
  loadProducts();
};

const handleCategoryButtonClick = (e) => {
  const category = e.target.dataset.category;
  currentFilters.category = category;
  
  // Update select dropdown
  const select = document.getElementById('categoryFilter');
  if (select) select.value = category;
  
  updateCategoryButtons(category);
  loadProducts();
};

const updateCategoryButtons = (category) => {
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
};

const toggleWishlist = async (itemId) => {
  try {
    const wishlistResult = await wishlistAPI.check(itemId);
    
    if (wishlistResult.inWishlist) {
      await wishlistAPI.remove(wishlistResult.wishlistId);
      showToast('Removed from wishlist', 'info');
    } else {
      await wishlistAPI.add(itemId);
      showToast('Added to wishlist!', 'success');
    }
    
    updateWishlistButtons();
  } catch (error) {
    showToast(getErrorMessage(error), 'error');
  }
};

const toggleWishlistFromCard = (e, itemId) => {
  e.stopPropagation();
  toggleWishlist(itemId);
};

const updateWishlistButtons = async () => {
  try {
    const wishlist = await wishlistAPI.getAll();
    const wishlistItemIds = wishlist.map(w => w.itemId._id);

    const buttons = document.querySelectorAll('.wishlist-btn');
    buttons.forEach(btn => {
      const card = btn.closest('.product-card');
      const productTitle = card.querySelector('.product-title');
      const productId = allProducts.find(p => p.title === productTitle.textContent)?._id;

      if (wishlistItemIds.includes(productId)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  } catch (error) {
    console.error('Error updating wishlist buttons:', error);
  }
};

const viewProduct = (id) => {
  window.location.href = `product-details.html?id=${id}`;
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
