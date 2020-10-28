import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import MoviePage from '@/pages/MoviePage.vue';
import MovieCreatePage from '@/pages/MovieCreatePage.vue';
import MovieUpdatePage from '@/pages/MovieUpdatePage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'movie', component: MoviePage, path: '/movie/:id' },
  { name: 'create', component: MovieCreatePage, path: '/create' },
  { name: 'update', component: MovieUpdatePage, path: '/update/:id' },
  { name: 'notFound', component: NotFoundPage, path: '*' },
];

const router = new VueRouter({
  routes,
});

export default router;
