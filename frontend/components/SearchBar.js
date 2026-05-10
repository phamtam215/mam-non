export const SearchBar = {
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  template: `
    <div class="search-wrap">
      <label for="product-search" class="sr-only">Tìm kiếm hải sản đà nẵng</label>
      <input
        id="product-search"
        type="search"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Tìm theo tên hải sản, mực khô, cá bò..."
        aria-label="Tìm kiếm hải sản"
      >
    </div>
  `
};
