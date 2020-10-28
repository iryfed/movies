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

    <div class="lds-roller-container" v-if="movieLoading || updateLoading">
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

    <div  v-if="movieData">

    <div class="breadcrumbs">
        <router-link :to="{ name: 'main' }">
          <span class="breadcrumbs__link">главная</span>
        </router-link>
        <router-link :to="{ name: 'movie', params: { id: movie.id } }">
          <span class="breadcrumbs__link">{{ movie.title }}</span>
        </router-link>
      <span>изменить фильм {{ movie.title }}</span>
    </div>

    <p class="error" v-if="updateError">
      <strong class="error">Ошибка:</strong> не удалось изменить фильм.
    </p>

    <h1>Изменить фильм {{ movie.title }}</h1>

     <form class="movie-form" action="#" @submit.prevent="updateMovie">
        <BaseMovieForm :movie="movie" />
      </form>
    </div>

    </div>
  </main>
</div>
</template>

<script>
import BaseLogo from '@/components/BaseLogo.vue';
import BaseMovieForm from '@/components/BaseMovieForm.vue';
import movieItemMixin from '@/mixins/movieItemMixin';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  data() {
    return {
      updateLoading: false,
      updateError: false,
    };
  },
  components: { BaseLogo, BaseMovieForm },
  mixins: [movieItemMixin],
  methods: {
    updateMovie() {
      this.updateLoading = true;
      this.updateError = false;
      axios.put(`${API_BASE_URL}/movies/update/${this.movie.id}`, {
        ...this.movieItem,
      }).then(
        (response) => {
          this.movieData = response.data;
          this.$router.push({ name: 'movie', params: { id: response.data.search.id } });
        },
      ).catch(
        (error) => {
          this.updateError = true;
          this.updateLoading = false;
          console.log('error: ', error);
        },
      ).then(
        () => { this.updateLoading = false; },
      );
    },
  },
};
</script>
