import { createApp, computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js';
import { SiteHeader } from './components/SiteHeader.js';
import { HeroSection } from './components/HeroSection.js';
import { SearchBar } from './components/SearchBar.js';
import { CategoryTabs } from './components/CategoryTabs.js';
import { ProductGrid } from './components/ProductGrid.js';
import { SiteFooter } from './components/SiteFooter.js';

const API_BASE = window.location.origin;

createApp({
  components: {
    SiteHeader,
    HeroSection,
    SearchBar,
    CategoryTabs,
    ProductGrid,
    SiteFooter
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
      displayCount.value = BATCH_SIZE;
      fetchProducts();
    });

    const fetchProducts = async () => {
      loading.value = true;
      error.value = '';

      try {
        const params = new URLSearchParams();

        if (search.value.trim()) {
          params.set('search', search.value.trim());
        }

        if (category.value !== 'all') {
          params.set('category', category.value);
        }

        const query = params.toString();
        const response = await fetch(
          `${API_BASE}/api/products${query ? `?${query}` : ''}`
        );

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

    const formatPrice = (price, unit) => `${Number(price).toLocaleString('vi-VN')}d/${unit || 'kg'}`;

    const goProducts = () => {
      const section = document.getElementById('products');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const goFooter = async () => {
      const footer = document.getElementById('footer');
      if (!footer) return;

      // Expand all current filtered products so the footer position is stable.
      displayCount.value = filtered.value.length;
      await nextTick();

      footer.scrollIntoView({ behavior: 'smooth' });

      requestAnimationFrame(() => {
        footer.scrollIntoView({ behavior: 'smooth' });
      });

      if (window.location.hash !== '#footer') {
        history.replaceState(null, '', '#footer');
      }
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
      if (window.location.hash === '#footer') {
        history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
        window.scrollTo({ top: 0, behavior: 'auto' });
      }

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
        goFooter,
      hasMore,
      loadMore
    };
  },
  template: `
    <div class="page-shell">
        <site-header
          :category="category"
          @change-category="category = $event"
          @go-footer="goFooter"
        ></site-header>
      <hero-section @go-products="goProducts"></hero-section>
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
    </div>
  `
}).mount('#app');
