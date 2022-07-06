import store from "@/store";
import axios from "axios";
import { Store } from "vuex";

export default class Auth0Service {
  isUserAuthenticated = false;
  userClaims = null;

  onUpdated() {
    console.log(`the component is now updated.`);
  }

  public login(): void {
    window.location.href = "/bff/login";
  }

  public logout(): void {
    // var logoutUrl = this.userClaims?.find(
    //   (claim) => claim.type === "bff:logout_url"
    // ).value;
    window.location.href = "/bff/logout";
  }

  public async getUserClaimFromBFF(): Promise<void> {
    console.log(`getUserClaimFromBFF`);
    axios.defaults.headers.common["X-CSRF"] = "1";
    debugger;
    try {
      await axios.get("/bff/user").then((apiResponse) => {
        debugger;
        if (apiResponse) {
          this.isUserAuthenticated = true;
          console.log("getUserClaimFromBFF: " + JSON.stringify(apiResponse));
          this.userClaims = apiResponse.data;
          console.log("this.userClaims: " + this.userClaims);
          console.log("dispatch setIsUserAuthenticated");
          store.dispatch("setIsUserAuthenticated", true);
        }
      });
    } catch (error) {
      console.log("error: " + JSON.stringify(error));
    }
  }

  public async localApi(): Promise<void> {
    axios.defaults.headers.common["X-CSRF"] = "1";
    const res = await axios.get("/api/User");
    console.log("test02 " + JSON.stringify(res));
  }
}
