import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  data() {
    return {
      movieData: null,
      movieLoading: false,
      movieLoadingFailed: false,
    };
  },
  computed: {
    movie() {
      return this.movieData
        ? this.movieData.search.filter(
          (i) => i.id === this.$route.params.id,
        )[0]
        : {};
    },
  },
  methods: {
    loadMovie() {
      this.movieLoading = true;
      this.movieLoadingFailed = false;
      axios.get(`${API_BASE_URL}/movies`).then(
        (response) => { this.movieData = response.data; },
      ).catch(
        () => { this.movieLoadingFailed = true; },
      ).then(
        () => { this.movieLoading = false; },
      );
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadMovie();
      },
      immediate: true,
    },
  },
};
