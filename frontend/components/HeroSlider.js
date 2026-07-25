import { SLIDES, SLIDE_INTERVAL } from '../slides.js';

const SWIPE_THRESHOLD = 40;

export const HeroSlider = {
  emits: ['go-products'],
  data() {
    return {
      slides: SLIDES,
      index: 0,
      zoomed: false,
      paused: false,
      timer: null,
      touchStartX: 0
    };
  },
  computed: {
    current() {
      return this.slides[this.index] || null;
    },
    hasMany() {
      return this.slides.length > 1;
    }
  },
  watch: {
    zoomed(open) {
      document.body.style.overflow = open ? 'hidden' : '';
      // Dừng autoplay khi đang xem ảnh phóng to.
      if (open) this.stop();
      else this.start();
    }
  },
  methods: {
    go(i) {
      const total = this.slides.length;
      if (total === 0) return;
      this.index = (i + total) % total;
    },
    next() {
      this.go(this.index + 1);
    },
    prev() {
      this.go(this.index - 1);
    },
    select(i) {
      this.go(i);
      this.restart();
    },

    start() {
      this.stop();
      if (!this.hasMany || this.paused || this.zoomed) return;
      // Người dùng bật "giảm chuyển động" thì không tự chạy.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.timer = setInterval(this.next, SLIDE_INTERVAL);
    },
    stop() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    restart() {
      this.start();
    },

    onEnter() {
      this.paused = true;
      this.stop();
    },
    onLeave() {
      this.paused = false;
      this.start();
    },
    onVisibility() {
      // Tab ẩn thì dừng cho đỡ tốn pin, hiện lại thì chạy tiếp.
      if (document.hidden) this.stop();
      else this.start();
    },

    onTouchStart(e) {
      this.touchStartX = e.changedTouches[0].clientX;
    },
    onTouchEnd(e) {
      const delta = e.changedTouches[0].clientX - this.touchStartX;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      if (delta < 0) this.next();
      else this.prev();
      this.restart();
    },

    onKeydown(e) {
      if (e.key === 'Escape' && this.zoomed) {
        this.zoomed = false;
        return;
      }
      if (this.zoomed) return;
      if (e.key === 'ArrowRight') this.select(this.index + 1);
      if (e.key === 'ArrowLeft') this.select(this.index - 1);
    },

    // Được app.js gọi qua template ref khi bấm "Bảng giá" trên thanh menu.
    showMenuSlide() {
      const i = this.slides.findIndex(s => s.isMenu);
      if (i >= 0) this.select(i);

      const section = this.$refs.root;
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },
  mounted() {
    this.start();
    document.addEventListener('visibilitychange', this.onVisibility);
    window.addEventListener('keydown', this.onKeydown);
  },
  beforeUnmount() {
    this.stop();
    document.removeEventListener('visibilitychange', this.onVisibility);
    window.removeEventListener('keydown', this.onKeydown);
    document.body.style.overflow = '';
  },
  template: `
    <section
      ref="root"
      class="hero-slider"
      aria-roledescription="carousel"
      aria-label="Ảnh quảng cáo đặc sản PATA"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <div
        class="slider-viewport"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div
          v-for="(slide, i) in slides"
          :key="slide.image"
          class="slide"
          :class="{ active: i === index, 'has-text': !!(slide.title || slide.text) }"
          :aria-hidden="i !== index"
        >
          <figure class="slide-media" @click="zoomed = true">
            <img
              :src="slide.image"
              :alt="slide.alt"
              :loading="i === 0 ? 'eager' : 'lazy'"
              :fetchpriority="i === 0 ? 'high' : 'auto'"
              decoding="async"
            >
            <span class="zoom-badge" aria-hidden="true">🔍</span>
          </figure>

          <div v-if="slide.title || slide.text" class="slide-body">
            <h2 v-if="slide.title" class="slide-title">{{ slide.title }}</h2>
            <p v-if="slide.text" class="slide-text">{{ slide.text }}</p>
            <a v-if="slide.cta" class="slide-cta" :href="slide.cta.href">{{ slide.cta.label }}</a>
          </div>
        </div>

        <button v-if="hasMany" class="slider-arrow prev" @click="select(index - 1)" aria-label="Ảnh trước">‹</button>
        <button v-if="hasMany" class="slider-arrow next" @click="select(index + 1)" aria-label="Ảnh tiếp theo">›</button>

      </div>

      <div v-if="hasMany" class="slider-dots" role="tablist" aria-label="Chọn ảnh">
        <button
          v-for="(slide, i) in slides"
          :key="'dot-' + i"
          class="dot"
          :class="{ active: i === index }"
          role="tab"
          :aria-selected="i === index"
          :aria-label="'Ảnh ' + (i + 1)"
          @click="select(i)"
        ></button>
      </div>
    </section>

    <section class="hero-intro">
      <div class="container">
        <h1>Đặc Sản Khô &amp; Rim PATA Đà Nẵng</h1>
        <p>Mực khô, cá bò khô, cá chỉ vàng, đặc sản rim và nước mắm nguyên chất - không chất bảo quản, giao hàng toàn quốc.</p>
        <div class="intro-actions">
          <button class="btn-primary" @click="$emit('go-products')">Xem sản phẩm</button>
          <a class="btn-ghost" href="tel:0764933884">Hotline: 0764.933.884</a>
        </div>
      </div>
    </section>

    <section class="trust-strip">
      <div class="container trust-grid">
        <div class="trust-item">
          <span class="trust-icon" aria-hidden="true">✓</span>
          <span>Không chất bảo quản</span>
        </div>
        <div class="trust-item">
          <span class="trust-icon" aria-hidden="true">◎</span>
          <span>Chuẩn vị nhà làm</span>
        </div>
        <div class="trust-item">
          <span class="trust-icon" aria-hidden="true">🚚</span>
          <span>Giao hàng toàn quốc</span>
        </div>
        <div class="trust-item">
          <span class="trust-icon" aria-hidden="true">☏</span>
          <span>Đặt hàng: 0764.933.884</span>
        </div>
      </div>
    </section>

    <div
      v-if="zoomed && current"
      class="lightbox"
      :class="{ 'lightbox-wide': current.isMenu }"
      role="dialog"
      aria-modal="true"
      aria-label="Ảnh phóng to"
      @click="zoomed = false"
    >
      <button class="lightbox-close" @click.stop="zoomed = false" aria-label="Đóng">×</button>
      <img :src="current.image" :alt="current.alt" @click.stop>
    </div>
  `
};
