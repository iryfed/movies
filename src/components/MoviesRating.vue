<template>
<div class="movie__rating" v-if="imdbID">
  <a :href="link" target="_blank">
    <span class="imdb"></span>
  </a>
  <span class="imdb-star">{{ rating.imdbRating }}</span>
  <div class="lds-mini" v-if="imdbDataLoading">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
  <span class="error" v-if="imdbDataLoadingFailed || rating.Error">ошибка загрузки</span>
  </div>
</template>

<script>
import axios from 'axios';
import { API_IMDB_URL } from '../config';

export default {
  props: ['imdbID'],
  data() {
    return {
      imdbData: null,
      imdbDataLoading: false,
      imdbDataLoadingFailed: false,
    };
  },
  computed: {
    rating() {
      return this.imdbData ? this.imdbData : [];
    },
    link() {
      return `https://www.imdb.com/title/${this.imdbID}`;
    },
  },
  methods: {
    loadRating() {
      this.imdbDataLoading = true;
      this.imdbDataLoadingFailed = false;
      clearTimeout(this.loadRatingTimer);
      this.loadRatingTimer = setTimeout(() => {
        axios.get(`${API_IMDB_URL}`, {
          params: {
            i: this.imdbID,
            apikey: 'f2297fd4',
          },
        }).then(
          (response) => { this.imdbData = response.data; },
        ).catch(
          () => { this.imdbDataLoadingFailed = true; },
        ).then(
          () => { this.imdbDataLoading = false; },
        );
      }, 1000);
    },
  },
  created() {
    this.loadRating();
  },
};
</script>
