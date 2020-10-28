<template>
<div>
  <fieldset>
    <input type="hidden" name="id" placeholder="id" v-model.trim="movieItem.id">
    <input type="text" name="title" placeholder="Название фильма"
               v-model.trim="movieItem.title" required>
    <input type="text" name="titleEn" placeholder="Movie title"
               v-model.trim="movieItem.titleEn" required>
    <input type="text" name="country" placeholder="Страна" v-model.trim="movieItem.country">
    <input type="number" name="year" placeholder="Год выпуска" v-model.trim.number="movieItem.year">
    <input type="text" name="type" placeholder="Тип" v-model.trim="movieItem.type">
    <textarea name="description" placeholder="описание" v-model="movieItem.description"></textarea>
  </fieldset>

  <fieldset>
    <legend>жанры</legend>
    <div class="lds-mini" v-if="genresListLoading">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <span class="error" v-if="genresListLoadingFailed">ошибка загрузки</span>
    <div v-if="genresList.length !== 0">
    <div class="field__genre" v-for="genre in genresList" :key="genre.name">
      <input type="checkbox"
                 :id="genre.name"
                 :value="genre"
                 v-model="genres">
      <span :for="genre.name">{{ genre.name }}</span>
    </div>
    </div>
  </fieldset>

  <fieldset>
    <input type="text" name="imdbID" placeholder="imdbID" v-model.trim="movieItem.imdbID">
  </fieldset>

  <fieldset>
    <input type="url" name="poster" placeholder="ссылка на постер к фильму"
               v-model.trim="movieItem.poster" required>
  </fieldset>

  <fieldset>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3"></div>
      <div class="col-xs-12 col-sm12 col-md-4 col-lg-3">
        <button type="button" class="btn btn-reset btn-extend" @click="backPrevPage">
          отменить
        </button>
      </div>
      <div class="col-xs-12 col-sm12 col-md-4 col-lg-3">
        <input type="reset" class="btn btn-reset btn-extend" value="сбросить">
      </div>
      <div class="col-xs-12 col-sm12 col-md-4 col-lg-3">
        <input type="submit" class="btn btn-submit btn-extend" value="cохранить">
      </div>
    </div>
  </fieldset>
</div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  props: ['movie'],
  data() {
    return {
      genresListData: null,
      genresListLoading: false,
      genresListLoadingFailed: false,
      movieItem: this.movie || {},
      genres: this.movie.genres || [],
    };
  },
  computed: {
    genresList() {
      return this.genresListData ? this.genresListData : [];
    },
  },
  methods: {
    loadGenresList() {
      this.genresListLoading = true;
      this.genresListLoadingFailed = false;
      clearTimeout(this.loadGenresTimer);
      this.loadGenresTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/genre`).then(
          (response) => { this.genresListData = response.data; },
        ).catch(
          () => { this.genresListLoadingFailed = true; },
        ).then(
          () => { this.genresListLoading = false; },
        );
      }, 0);
    },
    backPrevPage() {
      this.$router.go(-1);
    },
  },
  created() {
    this.loadGenresList();
  },
};
</script>
