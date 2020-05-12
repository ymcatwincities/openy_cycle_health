import Vue from 'vue';
import Bingo from './Bingo.vue';
import Notifications from 'vue-notification';
import 'babel-polyfill';

Vue.use(Notifications);

new Vue({
  delimiters: ['[{', '}]'],
  components: {
    Bingo
  },
}).$mount('#bingo_app');

Vue.config.devtools = true;
