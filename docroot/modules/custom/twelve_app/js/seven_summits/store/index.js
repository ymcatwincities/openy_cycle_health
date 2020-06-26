import Vue from 'vue';
import Vuex from 'vuex';
import Axios from "axios";
import router from "../router";
import modalMountainInfo from "./modalMountainInfo";
import badge from "./badge";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    modalMountainInfo,
    badge,
  },

  state: {
    heroSelected: false,
    jacketColor: '',
    summits: '',
    summits_reached: '',
    mountains_conquered: '',
    debug: ''
  },
  mutations: {
    updateJacketColor(state, color) {
      state.jacketColor = color;
    },
    incrementSummitsReached(state) {
      state.summits_reached++;
    },
    incrementMountainsConquered(state) {
      state.mountains_conquered++;
    },
    updateHeroSelected(state) {
      state.heroSelected = !state.heroSelected;
    },
  },
  actions: {
    saveHero (context) {
      Axios({
        method: 'get',
        url: `/seven-summits/save-hero/${context.state.jacketColor}`
      }).then((response) => {
        if (response.data.status === 'ok') {
          context.commit('updateHeroSelected');
          router.push('Mountains');
        } else {
          if (process.env.DEBUG) {
            console.log(error);
          }
        }
      }).catch((error) => {
        if (process.env.DEBUG) {
          console.log(error);
        }
      });
    }
  },
});
