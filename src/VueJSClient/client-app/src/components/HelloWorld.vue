<template>
  <div class="hello">
    <h1 v-if="!this.$store.getters.isUserAuthenticatedState">
      {{ msg }} Please authenticate.
    </h1>
    <h2 v-if="this.$store.getters.isUserAuthenticatedState">
      Hello {{ this.$store.getters.userInfoState.name }}
    </h2>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})
export default class HelloWorld extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
