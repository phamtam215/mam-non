export const CategoryTabs = {
  props: {
    category: {
      type: String,
      required: true
    }
  },
  emits: ['change-category'],
  template: `
    <nav class="tabs-wrap" role="navigation" aria-label="Lọc danh mục sản phẩm">
      <h2 class="sr-only">Danh mục đặc sản</h2>
      <button :class="{ active: category === 'all' }" @click="$emit('change-category', 'all')" :aria-current="category === 'all' ? 'page' : false">Tất cả</button>
      <button :class="{ active: category === 'kho' }" @click="$emit('change-category', 'kho')" :aria-current="category === 'kho' ? 'page' : false">Đặc sản khô</button>
      <button :class="{ active: category === 'rim' }" @click="$emit('change-category', 'rim')" :aria-current="category === 'rim' ? 'page' : false">Đặc sản rim</button>
      <button :class="{ active: category === 'mam' }" @click="$emit('change-category', 'mam')" :aria-current="category === 'mam' ? 'page' : false">Nước mắm &amp; mắm ruốc</button>
    </nav>
  `
};
