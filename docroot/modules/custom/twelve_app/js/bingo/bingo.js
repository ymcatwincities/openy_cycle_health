import Vue from 'vue';
import VueRouter from 'vue-router';
import Bingo from './Bingo.vue';
import Notifications from 'vue-notification';
import 'babel-polyfill';

Vue.use(Notifications);
Vue.use(VueRouter);

const router = new VueRouter();

new Vue({
  delimiters: ['[{', '}]'],
  router,
  components: {
    Bingo
  },
}).$mount('#bingo_app');

Vue.config.devtools = true;
