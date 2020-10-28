<template>
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
  <div class="movies__item movie">
    <router-link :to="{ name: 'movie', params: {id: movie.id} }">
    <img class="movie__img hvr-grow-shadow" :src="movie.poster" :alt="movie.title">
    </router-link>
    <div class="movie__action action flex-container">
      <MovieActionUpdate :movieId="movie.id" />
      <MovieActionDelete :movie="movie" />
    </div>
    <router-link :to="{ name: 'movie', params: {id: movie.id} }">
      <div class="movie__title">
        {{ movie.title }}
      </div>
    </router-link>
    <div class="movie__props">
      {{ movie.country }}, {{ movie.year }},
      <span class="movie__type">{{ movie.type }}</span>
    </div>
    <div class="movie__genres">
      <span v-for="genre in movie.genres" :key="genre.name">
        {{ genre.name }}
      </span>
    </div>
    <MoviesRating :imdbID="movie.imdbID" />
  </div>
</div>
</template>

<script>
import MoviesRating from '@/components/MoviesRating.vue';
import MovieActionUpdate from '@/components/MovieActionUpdate.vue';
import MovieActionDelete from '@/components/MovieActionDelete.vue';

export default {
  props: ['movie'],
  components: { MoviesRating, MovieActionUpdate, MovieActionDelete },
};
</script>
