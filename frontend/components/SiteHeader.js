export const SiteHeader = {
  props: {
    category: {
      type: String,
      required: true
    }
  },
  emits: ['change-category', 'go-menu'],
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    handleCategoryClick(cat) {
      this.$emit('change-category', cat);
      this.menuOpen = false;
      const section = document.getElementById('products');
      if (section) {
        setTimeout(() => section.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    },
    handleMenuClick() {
      this.menuOpen = false;
      this.$emit('go-menu');
    }
  },
  template: `
    <header class="top-header">
      <div class="container nav-inner">
        <button
          class="menu-toggle"
          :class="{ open: menuOpen }"
          @click="menuOpen = !menuOpen"
          :aria-expanded="menuOpen"
          aria-controls="mobile-drawer"
          aria-label="Mở menu điều hướng"
        >
          <span></span><span></span><span></span>
        </button>

        <a href="/" class="brand" aria-label="Về trang chủ PATA Hải Sản">
          <img class="brand-logo" src="/images/logo-PATA-transparent.png" alt="Logo Hải Sản PATA" width="62" height="40">
          <div>
            <span class="brand-name">HẢI SẢN PATA</span>
            <span class="brand-tagline">ĐẶC SẢN KHÔ ĐÀ NẴNG</span>
          </div>
        </a>

        <nav class="nav-links" aria-label="Điều hướng chính">
          <button :class="{ active: category === 'all' }" @click="handleCategoryClick('all')">Tất cả</button>
          <button :class="{ active: category === 'kho' }" @click="handleCategoryClick('kho')">Đặc sản khô</button>
          <button :class="{ active: category === 'rim' }" @click="handleCategoryClick('rim')">Đặc sản rim</button>
          <button :class="{ active: category === 'mam' }" @click="handleCategoryClick('mam')">Nước mắm</button>
          <a href="#bang-gia" class="nav-highlight" @click.prevent="handleMenuClick">Bảng giá</a>
        </nav>

        <a class="header-call" href="tel:0764933884" aria-label="Gọi hotline 0764.933.884">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>0764.933.884</span>
        </a>
      </div>

      <div id="mobile-drawer" class="mobile-drawer" v-show="menuOpen">
        <button :class="{ active: category === 'all' }" @click="handleCategoryClick('all')">Tất cả sản phẩm</button>
        <button :class="{ active: category === 'kho' }" @click="handleCategoryClick('kho')">Đặc sản khô</button>
        <button :class="{ active: category === 'rim' }" @click="handleCategoryClick('rim')">Đặc sản rim</button>
        <button :class="{ active: category === 'mam' }" @click="handleCategoryClick('mam')">Nước mắm &amp; mắm ruốc</button>
        <a href="#bang-gia" @click.prevent="handleMenuClick">Bảng giá tổng hợp</a>
        <a class="mobile-call" href="tel:0764933884">Gọi ngay: 0764.933.884</a>
      </div>
    </header>
  `
};
