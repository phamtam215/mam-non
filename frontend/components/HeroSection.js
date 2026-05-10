export const HeroSection = {
  emits: ['go-products'],
  template: `
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <h2>Hải Sản Sạch<br><span>Chuẩn Vị Đà Nẵng</span></h2>
          <p>Chuyên cung cấp sỉ lẻ hải sản tươi sống trong ngày và đặc sản khô chất lượng cao.</p>
          <div class="hero-actions">
            <button class="btn-primary" @click="$emit('go-products')">Xem sản phẩm</button>
            <a class="btn-outline" href="tel:0764933884">Hotline: 0764.933.884</a>
          </div>
        </div>
      </div>
      <div class="orb orb-one"></div>
      <div class="orb orb-two"></div>
    </section>
  `
};
