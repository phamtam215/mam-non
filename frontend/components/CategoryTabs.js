export const CategoryTabs = {
  props: {
    category: {
      type: String,
      required: true
    }
  },
  emits: ['change-category'],
  template: `
    <nav class="tabs-wrap" role="navigation" aria-label="Lọc danh mục hải sản">
      <h2 class="sr-only">Danh mục hải sản</h2>
      <button :class="{ active: category === 'all' }" @click="$emit('change-category', 'all')" :aria-current="category === 'all' ? 'page' : false">Tất cả hải sản</button>
      <button :class="{ active: category === 'fresh' }" @click="$emit('change-category', 'fresh')" :aria-current="category === 'fresh' ? 'page' : false">Hải sản tươi</button>
      <button :class="{ active: category === 'dried' }" @click="$emit('change-category', 'dried')" :aria-current="category === 'dried' ? 'page' : false">Hải sản khô - Đặc sản</button>
    </nav>
  `
};
