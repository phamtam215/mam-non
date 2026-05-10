export const HeroSection = {
  emits: ['go-products'],
  template: `
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <h1>Hải Sản PATA Tươi Sống & Khô Đà Nẵng</h1>
          <p>Chuyên cung cấp sỉ lẻ hải sản tươi sống trong ngày, mực khô, cá bò khô và đặc sản Đà Nẵng chất lượng cao. Hải sản sạch, chuẩn vị Đà Nẵng - Giao hàng nhanh toàn thành phố.</p>
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
