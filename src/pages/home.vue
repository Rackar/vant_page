<template>
  <div class="homepage">
    <div >
      <h2>明柳之心</h2>
      <div class="subtitle">死亡不是永别，忘记才是</div>
      <div class="subtitle">为那些最珍贵的人做纪念</div>

      <div class="button-group">
        <van-button icon="star-o" type="primary" @click="$router.push('/signup')">注册</van-button>
        <van-button icon="star-o" type="primary" @click="$router.push('/login')" style="margin-left:30px;">登陆</van-button>
      </div>
           <div class="button-group">
        <van-button icon="star-o" type="primary" @click="$store.commit('logout_delToken')">登出</van-button>
        <van-button icon="star-o" type="primary" @click="personCreate" style="margin-left:30px;">新建人物</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    personCreate() {
      this.$router.push("/personCreate");
    }
  }
};
</script>

<style lang="scss" scoped>
.homepage {
  background-color: aliceblue;
  height: 92vh;
  h2 {
    margin: 0 0 80px 0;
    padding-top:160px;
  }
  .subtitle {
    margin: 40px 0 0 0;
  }
  .button-group {
    margin: 40px 0 0 0;
  }
}
</style>