<template>
<div>
<header>
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5 flex-container">
            <BaseLogo />
          </div>

          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-5 find">
            <FindMoviesItem :title.sync="title" />
          </div>

          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2 create">
            <MovieActionCreate>
              добавить фильм
            </MovieActionCreate>
          </div>

        </div>
      </div>
</header>

<main>
  <div class="container">
    <h1 class="page-title">Найдено фильмов: {{ moviesCount }}</h1>

    <div class="lds-roller-container" v-if="moviesListLoading">
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

    <div v-if="moviesListLoadingFailed">
      Ошибка загрузки =(
    </div>

    <MoviesList :movies="movies" />
  </div>

  <BasePagination v-model="currentPage" :count="moviesCount" :size-page="sizePage" />
</main>
</div>
</template>

<script>
import BaseLogo from '@/components/BaseLogo.vue';
import MoviesList from '@/components/MoviesList.vue';
import FindMoviesItem from '@/components/FindMoviesItem.vue';
import BasePagination from '@/components/BasePagination.vue';
import MovieActionCreate from '@/components/MovieActionCreate.vue';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  components: {
    BaseLogo,
    MoviesList,
    FindMoviesItem,
    BasePagination,
    MovieActionCreate,
  },
  data() {
    return {
      moviesData: null,
      moviesListLoading: true,
      moviesListLoadingFailed: false,
      currentPage: 1,
      sizePage: 8,
      title: '',
    };
  },
  computed: {
    movies() {
      return this.moviesData ? this.moviesData.search : [];
    },
    moviesCount() {
      return this.moviesData ? this.moviesData.totalResults : 0;
    },
  },
  methods: {
    loadMovies() {
      this.moviesListLoading = true;
      this.moviesListLoadingFailed = false;
      clearTimeout(this.loadMoviesTimer);
      this.loadMoviesTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/movies/page=${this.currentPage}/size=${this.sizePage}/find`, {
          params: { title: this.title },
        }).then(
          (response) => { this.moviesData = response.data; },
        ).catch(
          () => { this.moviesListLoadingFailed = true; },
        ).then(
          () => { this.moviesListLoading = false; },
        );
      }, 0);
    },
  },
  watch: {
    title() {
      this.currentPage = 1;
      this.loadMovies();
    },
    currentPage() {
      this.loadMovies();
    },
  },
  created() {
    this.loadMovies();
  },
};
</script>
