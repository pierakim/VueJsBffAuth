<template>
  <div class="login">
    <h1>The login page</h1>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Options, Vue } from "vue-class-component";

export default class LoginView extends Vue {
  async created() {
    debugger;
    await this.getUser();
    // fetch("/bff/user").then((response) => response.json());
    // .then((data) => (this.totalVuePackages = data.total));
  }

  user: unknown;
  public async getUser(): Promise<void> {
    debugger;
    // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    // axios.defaults.headers.common["Access-Control-Allow-Headers"] = "*";

    // const { data } = await axios.get("/bff/login", {
    //   transformRequest: (data, headers) => {
    //     delete headers.common["Access-Control-Allow-Origin"];
    //     return data;
    //   },
    // });

    // if (data) {
    //   this.user = data;
    // }

    window.location.href = "/bff/login";

    // const { data } = await axios.get("/bff/login", {});
    // if (data) {
    //   this.user = data;
    // }
  }
}
</script>
