<template>
  <div id="app">
    <mainPage />
  </div>
</template>

<script>
import mainPage from "./components/main.vue";

export default {
  name: "app",
  components: {
    mainPage
  },
  created() {
    var token = window.localStorage.token;
    if (token) this.$store.commit("login_saveToken", token);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  /* background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957); */
}
body {
  margin: 0 auto;
  width: 100%;
}
</style>
