import Vue from 'vue'
import TodayProgress from '../components/TodayProgress.vue'

new Vue({
  delimiters: ['[{', '}]'],
  components: {
    TodayProgress
  },
}).$mount('#twelve_day_progress_app');

Vue.config.devtools = true;
