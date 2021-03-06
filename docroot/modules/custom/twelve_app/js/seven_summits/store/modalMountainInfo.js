export default {
  namespaced: true,
  state: () => ({
    modal: false,
    mountain: null
  }),
  mutations: {
    showModal(state, mountain) {
      state.mountain = mountain;
      state.modal = true;
    },
    hideModal(state) {
      state.mountain = null;
      state.modal = false;
    }
  }
}
