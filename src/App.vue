<template>
  <div id="app">
    <word word />
  </div>
</template>

<script>
import word from "./pages/word.vue";

export default {
  name: "app",
  components: {
    word
  }
};
</script>

<style>
h1 {
  text-align: center;
  margin: 10px 0 0 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  /* padding-top: 30px; */
}
</style>
