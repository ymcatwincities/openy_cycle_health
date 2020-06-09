import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersistence({
  key: 'vuex',
  storage: window.localStorage,
  // reducer: (state) => ({
  //   auth: {
  //     user: state.auth.user,
  //     loggedIn: state.auth.loggedIn,
  //   },
  // }),
});

export default new Vuex.Store({
  state: {
    jacketColor: '',
    fleshTone: ''
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
  plugins: [vuexLocalStorage.plugin],
});
