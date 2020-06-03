import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

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
  state: { },
  mutations: { },
  actions: { },
  plugins: [vuexLocalStorage.plugin],
});
