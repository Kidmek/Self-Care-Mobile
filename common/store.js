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
  logoutShown: false,
  hideModal: action((state) => {
    state.logoutShown = false;
  }),
  showModal: action((state) => {
    state.logoutShown = true;
  }),
  //

  // Forgot password
  isForgotPass: false,
  setForgotPass: action((state, payload) => {
    state.isForgotPass = payload;
  }),
  //

  //
  sound: null,
  setSound: action((state, payload) => {
    state.sound = payload;
  }),
  //
});
