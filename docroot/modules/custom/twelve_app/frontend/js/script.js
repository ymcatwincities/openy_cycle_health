import Vue from 'vue'
import TodayProgress from '../components/TodayProgress.vue'
//import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'

//Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
Vue.use(Notifications);

new Vue({
  delimiters: ['[{', '}]'],
  components: {
    TodayProgress
  },
}).$mount('#twelve_day_progress_app');

Vue.config.devtools = true;
