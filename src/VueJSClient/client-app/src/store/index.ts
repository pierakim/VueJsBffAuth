import { createStore } from "vuex";

export default createStore({
  state: {
    isUserAuthenticated: false,
  },
  mutations: {
    UPDATE_ISUSERAUTHENTICATED(state, isUserAuthenticated) {
      state.isUserAuthenticated = isUserAuthenticated;
    },
  },
  actions: {
    setIsUserAuthenticated(context, isUserAuthenticated) {
      context.commit("UPDATE_ISUSERAUTHENTICATED", isUserAuthenticated);
    },
  },
  getters: {
    isUserAuthenticatedState: function (state) {
      return state.isUserAuthenticated;
    },
  },
});
