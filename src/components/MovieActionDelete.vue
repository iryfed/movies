<template>
<div style="margin-top: 4px;">
  <button type="button" class="action__delete" v-on:click="showDialog"></button>
    <v-dialog name="dialog"
                    :width="400"
                    :height="120"
                    :clickToClose=true />
    <modal name="modal"
                 :width="400"
                 :height="120"
                 :clickToClose=false>
      <div class="vue-dialog-content">
        <div class="lds-mini" v-if="deleteLoading">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

         <div v-else-if="deleteSuccess">
         <button class="btn btn-close-modal" v-on:click="hideModalRedirect">&#10060;</button>
           Фильм удален!
         </div>

         <div v-else>
           <button class="btn btn-close-modal" v-on:click="hideModalError">&#10060;</button>
           <p class="error">
             <strong class="error">Ошибка:</strong> не удалось удалить фильм.
           </p>
         </div>
      </div>
    </modal>
</div>
</template>

<script>
import movieActionDeleteMixin from '@/mixins/movieActionDeleteMixin';

export default {
  mixins: [movieActionDeleteMixin],
  props: ['movie'],
  methods: {
    showDialog() {
      this.$modal.show('dialog', {
        title: '',
        text: `Хотите удалить фильм <strong>${this.movie.title}</strong> из каталога?`,
        buttons: [
          {
            title: '<div class="cancel">Отменить</div>',
            handler: () => {
              this.$modal.hide('dialog');
            },
          },
          {
            title: '<div class="delete">Удалить</div>',
            handler: () => {
              this.$modal.hide('dialog');
              this.$modal.show('modal');
              this.deleteMovie();
            },
          },
        ],
      });
    },
    hideModalError() {
      this.$modal.hide('modal');
    },
    hideModalRedirect() {
      this.$modal.hide('modal');
      if (this.$rout.name !== 'main') {
        this.$router.push({ name: 'main' });
      }
    },
  },
  mount() {
    this.show();
  },
};
</script>
