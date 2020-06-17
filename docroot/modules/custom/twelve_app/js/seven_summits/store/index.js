import Vue from 'vue';
import Vuex from 'vuex';
import Axios from "axios";
import router from "../router";
import modalMountainInfo from "./modalMountainInfo";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    modalMountainInfo,
  },

  state: {
    heroSelected: false,
    jacketColor: '',
    fleshTone: '',
    summits: '',
    finishes: '',
    debug: ''
  },
  mutations: {
    updateJacketColor(state, color) {
      state.jacketColor = color;
    },
    updateFleshTone(state, tone) {
      state.fleshTone = tone;
    }
  },
  actions: {
    saveHero (context) {
      Axios({
        method: 'get',
        url: `/seven-summits/save-hero/${context.state.jacketColor}/${context.state.fleshTone}`
      }).then((response) => {
        if (response.data.status === 'ok') {
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
