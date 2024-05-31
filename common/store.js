import { action, createStore } from 'easy-peasy';

export const store = createStore({
  // Loader
  loading: false,
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  //

  // Language
  locale: 'en',

  //

  //   Modal
  modalShown: undefined,
  hideModal: action((state) => {
    state.modalShown = null;
  }),
  showModal: action((state, payload) => {
    state.modalShown = payload;
  }),
  //

  // Forgot password
  isForgotPass: false,
  setForgotPass: action((state, payload) => {
    state.isForgotPass = payload;
  }),
  //
});
