<template>
<div>

  <div class="breadcrumbs">
      <router-link :to="{ name: 'main' }">
        <span class="breadcrumbs__link">главная</span>
      </router-link>
    <span>{{ movie.title }}</span>
  </div>

  <div v-if="Object.keys(movie).length !== 0">
    <div class="movie__action action flex-container">
      <MovieActionUpdate :movieId="movie.id" />
      <MovieActionDelete :movie="movie" />
      <MovieActionCreate />
    </div>
    <h1 class="movie__title">{{ movie.title }}</h1>

    <div class="movie__props">
          {{ movie.country }}, {{ movie.year }},
          <span class="movie__type">{{ movie.type }}</span>
        </div>

        <hr>

        <div class="row">

          <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3">
            <img class="movie__img" :src="movie.poster" :alt="movie.title">
          </div>

          <div class="col-xs-12 col-sm-8 col-md-9 col-lg-9">

            <div class="movie__genres">
                <span v-for="genre in movie.genres" :key="genre.name">
                  {{ genre.name }}
                </span>
            </div>
            <MoviesRating :imdbID="movie.imdbID" />
            <div class="movie__descr">
              {{ movie.description }}
            </div>

          </div>
      </div>
      <div class="movie__trailer">
        <video-embed src="https://www.youtube.com/watch?v=-_DJEzZk2pc"></video-embed>
      </div>
  </div>

</div>
</template>

<script>
import MoviesRating from '@/components/MoviesRating.vue';
import MovieActionUpdate from '@/components/MovieActionUpdate.vue';
import MovieActionCreate from '@/components/MovieActionCreate.vue';
import MovieActionDelete from '@/components/MovieActionDelete.vue';

export default {
  props: ['movie'],
  components: {
    MoviesRating,
    MovieActionUpdate,
    MovieActionCreate,
    MovieActionDelete,
  },
};
</script>
