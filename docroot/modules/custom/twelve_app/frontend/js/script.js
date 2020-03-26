import Vue from 'vue'
import TodayProgress from '../components/TodayProgress.vue'
import VModal from 'vue-js-modal'

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

new Vue({
  delimiters: ['[{', '}]'],
  components: {
    TodayProgress
  },
}).$mount('#twelve_day_progress_app');

Vue.config.devtools = true;
