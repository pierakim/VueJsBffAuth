<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Main</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="#">Text01</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Text02</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Text03</a>
          </li>
        </ul>
        <button @click="login" type="button" class="btn btn-primary">
          Login
        </button>
        <button @click="localApi" type="button" class="btn btn-primary">
          User Info
        </button>
        <button @click="logout" type="button" class="btn btn-primary">
          Logout
        </button>
      </div>
    </div>
  </nav>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link>
  </nav> -->
  <router-view />
</template>

<script lang="ts">
import axios from "axios";
import { Vue } from "vue-class-component";
import Auth0Service from "./services/Auth0Service";

const auth0Service = new Auth0Service();

export default class App extends Vue {
  userClaims = null;
  async mounted() {
    console.log(`the component is now mounted`);
  }

  onUpdated() {
    console.log(`the component is now updated.`);
  }

  public login(): void {
    auth0Service.login();
  }

  public logout(): void {
    auth0Service.logout();
  }

  // public async getUserClaimFromBFF(): Promise<void> {
  //   console.log(`getUserClaimFromBFF`);
  //   axios.defaults.headers.common["X-CSRF"] = "1";
  //   const res = await axios.get("/bff/user");
  //   console.log("getUserClaimFromBFF: " + JSON.stringify(res));
  //   this.userClaims = await res.data;
  //   console.log("this.userClaims: " + this.userClaims);
  // }

  public async localApi(): Promise<void> {
    axios.defaults.headers.common["X-CSRF"] = "1";
    const res = await axios.get("/api/User");
    console.log("test02 " + JSON.stringify(res));
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
