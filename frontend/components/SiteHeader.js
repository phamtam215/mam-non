export const SiteHeader = {
  props: {
    category: {
      type: String,
      required: true
    }
  },
  emits: ['change-category', 'go-footer'],
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
          <button :class="{ active: category === 'all' }" @click="$emit('change-category', 'all')">Tất cả</button>
          <button :class="{ active: category === 'fresh' }" @click="$emit('change-category', 'fresh')">Hải sản tươi</button>
          <button :class="{ active: category === 'dried' }" @click="$emit('change-category', 'dried')">Hải sản khô</button>
          <a href="#footer" @click.prevent="$emit('go-footer')">Liên hệ</a>
        </nav>
      </div>
    </header>
  `
};
