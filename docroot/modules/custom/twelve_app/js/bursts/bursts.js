import Vue from 'vue'
import VueRouter from 'vue-router';
import Bursts from './Bursts.vue'
import Notifications from 'vue-notification'
import 'babel-polyfill'

Vue.use(Notifications);
Vue.use(VueRouter);

const router = new VueRouter();

new Vue({
  delimiters: ['[{', '}]'],
  router,
  components: {
    Bursts
  },
}).$mount('#twelve_day_progress_app');

Vue.config.devtools = true;
