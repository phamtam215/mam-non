export const CategoryTabs = {
  props: {
    category: {
      type: String,
      required: true
    }
  },
  emits: ['change-category'],
  template: `
    <div class="tabs-wrap">
      <button :class="{ active: category === 'all' }" @click="$emit('change-category', 'all')">Tất cả</button>
      <button :class="{ active: category === 'fresh' }" @click="$emit('change-category', 'fresh')">Hải sản tươi</button>
      <button :class="{ active: category === 'dried' }" @click="$emit('change-category', 'dried')">Hải sản khô</button>
    </div>
  `
};
