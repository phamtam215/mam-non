export const ProductGrid = {
  props: {
    products: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    formatPrice: {
      type: Function,
      required: true
    },
    hasMore: {
      type: Boolean,
      default: false
    }
  },
  emits: ['load-more'],
  template: `
    <section>
      <p v-if="loading && products.length === 0" class="state-text">Đang tải sản phẩm...</p>
      <p v-else-if="error" class="state-text state-error">{{ error }}</p>
      <p v-else-if="products.length === 0" class="state-text">Không tìm thấy sản phẩm phù hợp.</p>

      <div v-else class="product-grid">
        <article v-for="product in products" :key="product._id" class="product-card">
          <span v-if="product.isHot" class="hot-tag">BÁN CHẠY</span>
          <img :src="product.image" :alt="product.name">
          <div class="card-body">
            <small>{{ product.category === 'fresh' ? 'HẢI SẢN TƯƠI' : 'HẢI SẢN KHÔ' }}</small>
            <h3>{{ product.name }}</h3>
            <p>{{ formatPrice(product.price, product.unit) }}</p>
          </div>
        </article>
      </div>

      <div v-if="hasMore" ref="sentinel" class="sentinel"></div>
      <p v-if="loading && products.length > 0" class="loading-more">Đang tải thêm...</p>
    </section>
  `,
  watch: {
    hasMore(newVal) {
      if (!newVal) {
        if (this.observer) {
          this.observer.disconnect();
        }
        return;
      }

      this.$nextTick(() => this.setupObserver());
    },
    products() {
      if (!this.hasMore) return;
      this.$nextTick(() => this.setupObserver());
    }
  },
  methods: {
    setupObserver() {
      if (this.observer) this.observer.disconnect();
      
      this.observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.$emit('load-more');
        }
      }, { rootMargin: '100px' });
      
      if (this.$refs.sentinel) {
        this.observer.observe(this.$refs.sentinel);
      }
    }
  },
  mounted() {
    if (this.hasMore) {
      this.setupObserver();
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
};
