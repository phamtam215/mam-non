const MENU_IMAGE = '/images/pata-menu-goc-2000.png';

export const MenuOverview = {
  data() {
    return {
      zoomed: false
    };
  },
  watch: {
    zoomed(open) {
      // Khoá scroll nền khi modal mở.
      document.body.style.overflow = open ? 'hidden' : '';
    }
  },
  methods: {
    onKeydown(event) {
      if (event.key === 'Escape') this.zoomed = false;
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
    document.body.style.overflow = '';
  },
  template: `
    <section id="bang-gia" class="menu-overview">
      <div class="container menu-card">
        <figure class="menu-figure" @click="zoomed = true" title="Chạm để phóng to bảng giá">
          <img
            :src="menuImage"
            alt="Bảng giá danh mục đặc sản khô và rim PATA Đà Nẵng - mực khô, cá bò khô, cá chỉ vàng, cá cơm rim, mắm ruốc"
            loading="lazy"
            decoding="async"
            width="2000"
            height="2000"
          >
          <figcaption><span class="menu-zoom-hint">🔍 Phóng to</span></figcaption>
        </figure>

        <div class="menu-info">
          <h2>Bảng giá tổng hợp</h2>
          <p>Toàn bộ đặc sản khô, rim và nước mắm PATA trong một bảng - chạm vào ảnh để xem rõ từng món và giá.</p>
          <div class="menu-actions">
            <a class="btn-primary" href="tel:0764933884">Gọi đặt: 0764.933.884</a>
            <a class="btn-ghost" :href="menuImage" download>Tải bảng giá</a>
          </div>
        </div>
      </div>
    </section>

    <div v-if="zoomed" class="menu-modal" @click="zoomed = false" role="dialog" aria-modal="true" aria-label="Bảng giá phóng to">
      <button class="menu-modal-close" @click.stop="zoomed = false" aria-label="Đóng bảng giá">×</button>
      <img :src="menuImage" alt="Bảng giá đặc sản PATA Đà Nẵng phóng to" @click.stop>
    </div>
  `,
  computed: {
    menuImage() {
      return MENU_IMAGE;
    }
  }
};
