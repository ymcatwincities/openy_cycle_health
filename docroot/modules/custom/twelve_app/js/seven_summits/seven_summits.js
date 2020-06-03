import Vue from 'vue';
import Sevensummits from './Sevensummits.vue';
import Notifications from 'vue-notification';
import router from './router';
import store from './store';

Vue.use(Notifications);

new Vue({
  delimiters: ['[{', '}]'],
  router,
  store,
  components: {
    Sevensummits
  },
}).$mount('#seven_summits_app');

if (process.env.DEBUG) {
  console.log('Vue devtools enabled.');
  Vue.config.devtools = true;
}
