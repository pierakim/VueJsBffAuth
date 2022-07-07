import { UserClaim } from "@/models/UserClaim";
import store from "@/store";
import axios from "axios";

export default class Auth0Service {
  isUserAuthenticated = false;
  userClaims = Array<UserClaim>();

  onUpdated() {
    console.log(`Auth0Service - the component is now updated.`);
  }

  public login(): void {
    window.location.href = "/bff/login";
    // await axios
    //   .get("/bff/login")
    //   .then(function (response) {
    //     console.log("test: " + response.request.res.responseUrl);
    //   })
    //   .catch(function (no200) {
    //     console.error("404, 400, and other events");
    //   });
  }

  public logout(): void {
    debugger;
    const logoutURL = store.getters.userInfoState.logoutUrl;
    // var logoutUrl = this.userClaims?.find(
    //   (claim) => claim.type === "bff:logout_url"
    // ).value;
    window.location.href = logoutURL;
  }

  public async getUserClaimFromBFF(): Promise<void> {
    console.log(`Auth0Service - getUserClaimFromBFF`);
    axios.defaults.headers.common["X-CSRF"] = "1";
    try {
      return await axios.get("/bff/user").then(async (apiResponse) => {
        if (apiResponse) {
          this.isUserAuthenticated = true;
          // console.log(
          //   "Auth0Service - getUserClaimFromBFF: " + JSON.stringify(apiResponse)
          // );
          //this.userClaims = apiResponse.data;
          // debugger;
          // const jsonObj: any = JSON.parse(apiResponse.data);
          // this.userClaims = JSON.parse(apiResponse.data);
          debugger;
          // this.userClaims = apiResponse.data;
          this.userClaims = apiResponse.data;
          debugger;
          console.log(
            "Auth0Service - this.userClaims: " + JSON.stringify(this.userClaims)
          );
          debugger;
          console.log("Auth0Service - dispatch setIsUserAuthenticated");
          await store.dispatch("setIsUserAuthenticated", true);
          await store.dispatch("setUserInfo", this.userClaims);
          debugger;
        }
      });
    } catch (error) {
      debugger;
      console.log("error during /bff/user");
    }
  }

  public async localApi(): Promise<void> {
    axios.defaults.headers.common["X-CSRF"] = "1";
    const res = await axios.get("/api/User");
    console.log("test02 " + JSON.stringify(res));
  }
}
