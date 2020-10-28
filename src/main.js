import Vue from 'vue';
import Embed from 'v-video-embed';
import VModal from 'vue-js-modal';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Embed);
Vue.use(VModal, { dialog: true });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
