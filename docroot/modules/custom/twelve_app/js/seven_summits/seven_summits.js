import Vue from 'vue';
import SevenSummits from './SevenSummits.vue';
import Notifications from 'vue-notification';
import 'babel-polyfill';

Vue.use(Notifications);

new Vue({
  delimiters: ['[{', '}]'],
  components: {
    SevenSummits
  },
}).$mount('#seven_summits_app');

Vue.config.devtools = true;
