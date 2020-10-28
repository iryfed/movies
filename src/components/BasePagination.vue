<template>
<div class="pagination" v-if="count > sizePage">
  <div class="pagination__prev"
          :class="{'disabled' : currentPage <= 1}"
          @click.prevent="paginate(currentPage - 1, pages)"></div>

  <div class="pagination__item" :class="{'active' :pageNumber === currentPage}"
          v-for="pageNumber in pages" :key="pageNumber"
          @click.prevent="paginate(pageNumber, pages)">
    {{ pageNumber }}
  </div>

  <div class="pagination__next"
          :class="{'disabled' : currentPage >= pages}"
          @click.prevent="paginate(currentPage + 1, pages)"></div>
</div>
</template>

<script>
export default {
  model: {
    prop: 'currentPage',
    event: 'paginate',
  },
  props: ['currentPage', 'sizePage', 'count'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.sizePage);
    },
  },
  methods: {
    paginate(currentPage, pages) {
      if (currentPage >= 1 && currentPage <= pages) {
        this.$emit('paginate', currentPage);
      }
    },
  },
};
</script>
