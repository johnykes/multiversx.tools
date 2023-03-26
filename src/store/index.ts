import { createStore } from "vuex";

export default createStore({
  state: {
    theme: "light", // '' or 'light'
    innerWidth: undefined,
    innerHeight: undefined,
  },
  getters: {},
  mutations: {
    TOGGLE_THEME(state) {
      if (!state.theme) {
        state.theme = "light";
        localStorage.setItem("theme", "light");
      } else {
        state.theme = "";
        localStorage.setItem("theme", "");
      }
    },
    SET_SIZE(state, param): void {
      state.innerWidth = param.innerWidth;
      state.innerHeight = param.innerHeight;
    },
  },
  actions: {
    async init({ state }) {
      state.theme = localStorage.getItem("theme") ?? state.theme;
    },
    async updateScreenSize({ commit }, params) {
      commit("SET_SIZE", params);
    },
  },
  // modules: {
  //   x: x,
  // },
});
