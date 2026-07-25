export const HeroSection = {
  emits: ['go-products'],
  template: `
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <h1>Đặc Sản Khô &amp; Rim <span>PATA</span> Đà Nẵng</h1>
          <p>Mực khô, cá bò khô, cá chỉ vàng, đặc sản rim và nước mắm nguyên chất. Không chất bảo quản - Giao hàng toàn quốc.</p>
          <div class="hero-actions">
            <button class="btn-primary" @click="$emit('go-products')">Xem sản phẩm</button>
            <a class="btn-outline" href="tel:0764933884">Hotline: 0764.933.884</a>
          </div>
        </div>
      </div>
      <div class="orb orb-one"></div>
      <div class="orb orb-two"></div>
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
  `
};
