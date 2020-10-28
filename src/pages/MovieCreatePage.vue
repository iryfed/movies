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

    <div class="lds-roller-container" v-if="createLoading">
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

    <div class="breadcrumbs">
        <router-link :to="{ name: 'main' }">
          <span class="breadcrumbs__link">главная</span>
        </router-link>
      <span>добавить фильм</span>
    </div>

    <p v-if="createError" class="error">
      <strong class="error">Ошибка:</strong> Не удалось добавить новый фильм.
    </p>
    <h1>Добавить новый фильм в каталог</h1>
      <form class="movie-form" action="#" method="POST" @submit.prevent="createMovie">
        <BaseMovieForm :movie="{}" />
      </form>
    </div>
  </main>
</div>
</template>

<script>
import BaseLogo from '@/components/BaseLogo.vue';
import BaseMovieForm from '@/components/BaseMovieForm.vue';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  components: { BaseLogo, BaseMovieForm },
  data() {
    return {
      createLoading: false,
      createError: false,
      createErrorMessage: '',
    };
  },
  methods: {
    createMovie() {
      this.createError = false;
      this.createLoading = true;
      axios.post(`${API_BASE_URL}/movies/create`, {
        ...this.movieItem,
        genres: this.genres,
      }).then(
        (response) => {
          this.movieData = response.data;
          this.$router.push({ name: 'movie', params: { id: response.data.search.id } });
        },
      ).catch(
        (error) => {
          this.createLoading = false;
          this.createError = true;
          this.createErrorMessage = error.response.data.message;
        },
      ).then(
        () => { this.createLoading = false; },
      );
    },
  },
};
</script>
