export const SiteHeader = {
  props: {
    category: {
      type: String,
      required: true
    }
  },
  emits: ['change-category', 'go-footer'],
  methods: {
    handleCategoryClick(cat) {
      this.$emit('change-category', cat);
      // Scroll to products section on mobile
      if (window.innerWidth <= 960) {
        setTimeout(() => {
          const section = document.getElementById('products');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      }
    }
  },
  template: `
    <header class="top-header">
      <div class="container nav-inner">
        <div class="brand">
          <img class="brand-logo" src="/images/logo.jpg" alt="Logo Hải Sản PATA">
          <div>
            <h1>HẢI SẢN PATA</h1>
            <p>TƯƠI VÀ KHÔ ĐÀ NẴNG</p>
          </div>
        </div>

        <nav class="nav-links">
          <button :class="{ active: category === 'all' }" @click="handleCategoryClick('all')">Tất cả</button>
          <button :class="{ active: category === 'fresh' }" @click="handleCategoryClick('fresh')">Hải sản tươi</button>
          <button :class="{ active: category === 'dried' }" @click="handleCategoryClick('dried')">Hải sản khô</button>
          <a href="#footer" @click.prevent="$emit('go-footer')">Liên hệ</a>
        </nav>
      </div>
    </header>
  `
};
