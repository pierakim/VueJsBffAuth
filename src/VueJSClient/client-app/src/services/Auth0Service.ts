import store from "@/store";
import axios from "axios";

export default class Auth0Service {
  isUserAuthenticated = false;
  userClaims = null;

  onUpdated() {
    console.log(`Auth0Service - the component is now updated.`);
  }

  public async login(): Promise<void> {
    // window.location.href = "/bff/login";
    await axios
      .get("/bff/login")
      .then(function (response) {
        console.log("test: " + response.request.res.responseUrl);
      })
      .catch(function (no200) {
        console.error("404, 400, and other events");
      });
  }

  public logout(): void {
    // var logoutUrl = this.userClaims?.find(
    //   (claim) => claim.type === "bff:logout_url"
    // ).value;
    window.location.href = "/bff/logout";
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
          this.userClaims = apiResponse.data;
          // console.log("Auth0Service - this.userClaims: " + this.userClaims);
          debugger;
          console.log("Auth0Service - dispatch setIsUserAuthenticated");
          await store.dispatch("setIsUserAuthenticated", true);
          debugger;
        }
      });
    } catch (error) {
      console.log("error during /bff/user");
    }
  }

  public async localApi(): Promise<void> {
    axios.defaults.headers.common["X-CSRF"] = "1";
    const res = await axios.get("/api/User");
    console.log("test02 " + JSON.stringify(res));
  }
}
