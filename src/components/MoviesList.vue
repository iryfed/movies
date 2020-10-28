<template>
<div class="row movies">
  <MoviesItem :movie="movie" v-for="movie in movies" :key="movie.id"></MoviesItem>
</div>
</template>

<script>
import MoviesItem from './MoviesItem.vue';

export default {
  props: ['movies'],
  components: { MoviesItem },
};
</script>
