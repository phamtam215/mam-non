export const PaginationBar = {
  props: {
    page: { type: Number, required: true },
    totalPages: { type: Number, required: true }
  },
  emits: ['change-page'],
  template: `
    <div v-if="totalPages > 1" class="pagination">
      <button :disabled="page === 1" @click="$emit('change-page', page - 1)">‹</button>

      <button
        v-for="p in totalPages"
        :key="p"
        :class="{ active: p === page }"
        @click="$emit('change-page', p)"
      >{{ p }}</button>

      <button :disabled="page === totalPages" @click="$emit('change-page', page + 1)">›</button>
    </div>
  `
};
