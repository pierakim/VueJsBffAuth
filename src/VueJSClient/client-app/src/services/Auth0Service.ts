import { UserClaim } from "@/models/UserClaim";
import store from "@/store";
import axios from "axios";

export default class Auth0Service {
  userClaims = Array<UserClaim>();

  onUpdated() {
    console.log(`Auth0Service - the component is now updated.`);
  }

  public login(): void {
    window.location.href = "/bff/login";
  }

  public logout(): void {
    const logoutURL = store.getters.userInfoState.logoutUrl;
    window.location.href = logoutURL;
  }

  public async getUserClaimFromBFF(): Promise<void> {
    console.log(`Auth0Service - getUserClaimFromBFF`);
    axios.defaults.headers.common["X-CSRF"] = "1";
    try {
      return await axios.get("/bff/user").then(async (apiResponse) => {
        if (apiResponse) {
          this.userClaims = apiResponse.data;
          await store.dispatch("setIsUserAuthenticated", true);
          await store.dispatch("setUserInfo", this.userClaims);
        }
      });
    } catch (error) {
      console.log("error during /bff/user - error: " + JSON.stringify(error));
    }
  }

  public async localApi(): Promise<void> {
    axios.defaults.headers.common["X-CSRF"] = "1";
    const res = await axios.get("/api/User");
    console.log("test02 " + JSON.stringify(res));
  }
}
