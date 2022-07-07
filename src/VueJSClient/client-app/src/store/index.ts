import { UserInfo } from "@/models/UserInfo";
import { createStore } from "vuex";

export default createStore({
  state: {
    isUserAuthenticated: false,
    userInfo: {} as UserInfo,
  },
  mutations: {
    UPDATE_ISUSERAUTHENTICATED(state, isUserAuthenticated) {
      state.isUserAuthenticated = isUserAuthenticated;
    },
    UPDATE_USERINFO(state, userInfo) {
      const userInfoTemp = {} as UserInfo;
      userInfoTemp.name = userInfo.find((e: any) => e.type === "name").value;
      userInfoTemp.familyName = userInfo.find(
        (e: any) => e.type === "family_name"
      ).value;
      userInfoTemp.givenName = userInfo.find(
        (e: any) => e.type === "given_name"
      ).value;
      userInfoTemp.logoutUrl = userInfo.find(
        (e: any) => e.type === "bff:logout_url"
      ).value;
      state.userInfo = userInfoTemp;
    },
  },
  actions: {
    setIsUserAuthenticated(context, isUserAuthenticated) {
      context.commit("UPDATE_ISUSERAUTHENTICATED", isUserAuthenticated);
    },
    setUserInfo(context, userInfo) {
      context.commit("UPDATE_USERINFO", userInfo);
    },
  },
  getters: {
    isUserAuthenticatedState: function (state) {
      return state.isUserAuthenticated;
    },
    userInfoState: function (state) {
      return state.userInfo;
    },
  },
});
