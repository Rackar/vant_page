<template>
  <div class="hello">
    <!-- <navBarTop />
    <singlePerson />-->
    <div class="main_page">
      <router-view />
    </div>

    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="list" icon="search" replace to="/list">收藏列表</van-tabbar-item>
      <van-tabbar-item name="my" icon="friends-o" replace to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import navBarTop from "./navBarTop";
// import singlePerson from "../pages/singlePerson";
export default {
  name: "mainPage",
  props: {
    msg: String
  },
  components: {
    // singlePerson,
    // navBarTop
  },
  data() {
    return {
      active: "home"
    };
  }
};
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
.main_page {
  padding-bottom: 50px;
  /* margin-bottom: -50px;
  overflow: hidden;
  height: 400px; */
}
</style>
