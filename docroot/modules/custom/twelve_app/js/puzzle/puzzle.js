import Vue from 'vue';
import Puzzle from './Puzzle.vue';
import Notifications from 'vue-notification';
import 'babel-polyfill';

Vue.use(Notifications);

new Vue({
  delimiters: ['[{', '}]'],
  components: {
    Puzzle
  },
}).$mount('#twelve_puzzle_app');

Vue.config.devtools = true;
