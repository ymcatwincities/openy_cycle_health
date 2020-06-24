export default {
  namespaced: true,
  state: () => ({
    modal: false,
    type: '',
    text: '',
    url: '',
    buttonText: '',
  }),
  mutations: {
    showModal(state, payload) {
      state.type = payload.type;
      state.text = payload.text;
      state.url = payload.url;
      state.buttonText = payload.buttonText;
      state.modal = true;
    },
    hideModal(state) {
      state.type = '';
      state.text = '';
      state.url = '';
      state.buttonText = '';
      state.modal = false;
    }
  }
}
