import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  data() {
    return {
      deleteSuccess: false,
      deleteError: false,
      deleteLoading: false,
    };
  },
  methods: {
    deleteMovie() {
      this.deleteSuccess = false;
      this.deleteError = false;
      this.deleteLoading = true;
      axios.delete(`${API_BASE_URL}/movies/delete/${this.movie.id}`).then(
        () => {
          this.deleteSuccess = true;
        },
      ).catch(
        (error) => {
          console.log('error: ', error);
          this.deleteError = true;
        },
      ).then(
        () => { this.deleteLoading = false; },
      );
    },
  },
};
