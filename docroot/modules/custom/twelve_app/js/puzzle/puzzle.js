import Vue from 'vue';
import VueRouter from 'vue-router';
import Puzzle from './Puzzle.vue';
import Notifications from 'vue-notification';
import 'babel-polyfill';

Vue.use(Notifications);
Vue.use(VueRouter);

const router = new VueRouter();

new Vue({
  delimiters: ['[{', '}]'],
  router,
  components: {
    Puzzle
  },
}).$mount('#twelve_puzzle_app');

Vue.config.devtools = true;
