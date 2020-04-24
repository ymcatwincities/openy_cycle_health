import Vue from 'vue';
import TodayProgress from '../components/TodayProgress.vue';
import Notifications from 'vue-notification';
import 'babel-polyfill';

Vue.use(Notifications);

new Vue({
  delimiters: ['[{', '}]'],
  components: {
    TodayProgress
  },
}).$mount('#twelve_puzzle_app');

Vue.config.devtools = true;
