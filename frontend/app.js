import { createApp, computed, onBeforeUnmount, onMounted, ref, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js';
import { SiteHeader } from './components/SiteHeader.js';
import { HeroSlider } from './components/HeroSlider.js';
import { SearchBar } from './components/SearchBar.js';
import { CategoryTabs } from './components/CategoryTabs.js';
import { ProductGrid } from './components/ProductGrid.js';
import { SiteFooter } from './components/SiteFooter.js';
import { FloatingContact } from './components/FloatingContact.js';

const API_BASE = window.location.origin;

createApp({
  components: {
    SiteHeader,
    HeroSlider,
    SearchBar,
    CategoryTabs,
    ProductGrid,
    SiteFooter,
    FloatingContact
  },
  setup() {
    const allProducts = ref([]);
    const search = ref('');
    const category = ref('all');
    const loading = ref(false);
    const error = ref('');

    const BATCH_SIZE = 12;
    const displayCount = ref(BATCH_SIZE);

    // Danh sách sau khi filter/search
    const filtered = computed(() => {
      let list = allProducts.value;

      if (category.value !== 'all') {
        list = list.filter(p => p.category === category.value);
      }

      const q = search.value.trim().toLowerCase();
      if (q) {
        list = list.filter(p => p.name.toLowerCase().includes(q));
      }

      return list;
    });

    const products = computed(() => 
      filtered.value.slice(0, displayCount.value)
    );

    const hasMore = computed(() => 
      products.value.length < filtered.value.length
    );

    const loadMore = () => {
      displayCount.value += BATCH_SIZE;
    };

    watch([search, category], () => {
      // Reset visible batch when client-side filters change.
      displayCount.value = BATCH_SIZE;
    });

    const fetchProducts = async () => {
      loading.value = true;
      error.value = '';

      try {
        const response = await fetch(`${API_BASE}/api/products`);

        if (!response.ok) {
          throw new Error('Fetch products failed');
        }

        const result = await response.json();
        allProducts.value = result.data || [];
      } catch (err) {
        error.value = 'Không thể tải sản phẩm. Vui lòng thử lại.';
      } finally {
        loading.value = false;
      }
    };

    const formatPrice = (price, unit) => `${Number(price).toLocaleString('vi-VN')}đ/${unit || 'kg'}`;

    const goProducts = () => {
      const section = document.getElementById('products');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Bảng giá giờ là một slide trong slider: nhảy thẳng tới slide đó.
    const slider = ref(null);
    const goMenu = () => {
      if (slider.value) slider.value.showMenuSlide();
    };

    const scrollToHashTarget = (hash, smooth = true) => {
      if (!hash) return;

      const target = document.querySelector(hash);
      if (!target) return;

      target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    };

    const onHashChange = () => {
      scrollToHashTarget(window.location.hash, true);
    };

    onMounted(async () => {
      await fetchProducts();

      window.addEventListener('hashchange', onHashChange);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('hashchange', onHashChange);
    });

    return {
      products,
      search,
      category,
      loading,
      error,
      formatPrice,
      goProducts,
      goMenu,
      slider,
      hasMore,
      loadMore
    };
  },
  template: `
    <div class="page-shell">
      <site-header
        :category="category"
        @change-category="category = $event"
        @go-menu="goMenu"
      ></site-header>
      <hero-slider ref="slider" @go-products="goProducts"></hero-slider>
      <search-bar v-model="search"></search-bar>

      <main id="products" class="container content-wrap">
        <category-tabs :category="category" @change-category="category = $event"></category-tabs>
        <product-grid
          :products="products"
          :loading="loading"
          :error="error"
          :format-price="formatPrice"
          :has-more="hasMore"
          @load-more="loadMore"
        ></product-grid>
      </main>

      <site-footer></site-footer>
      <floating-contact></floating-contact>
    </div>
  `
}).mount('#app');
