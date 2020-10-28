<template>
<div>
<header>
<div class="container">
    <router-link :to="{ name: 'main' }" class="flex-container">
      <BaseLogo />
    </router-link>
  </div>
</header>

<main>
  <div class="container">

  <div v-if="movieLoading" class="lds-roller-container">
  <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>

    <div v-if="movieLoadingFailed">
      Ошибка загрузки =(
    </div>

  <MovieView :movie="movie" />
  </div>
</main>
</div>
</template>

<script>
import BaseLogo from '@/components/BaseLogo.vue';
import MovieView from '@/components/MovieView.vue';
import movieItemMixin from '@/mixins/movieItemMixin';

export default {
  components: { BaseLogo, MovieView },
  mixins: [movieItemMixin],
};
</script>
