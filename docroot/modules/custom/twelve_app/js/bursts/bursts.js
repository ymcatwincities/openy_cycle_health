import Vue from 'vue'
import Bursts from './views/Bursts.vue'
import Notifications from 'vue-notification'
import 'babel-polyfill'

Vue.use(Notifications);

new Vue({
  delimiters: ['[{', '}]'],
  components: {
    Bursts
  },
}).$mount('#twelve_day_progress_app');

Vue.config.devtools = true;
