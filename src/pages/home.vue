<template>
  <div>
    <div class="homepage">
      <h2>明柳之心</h2>
      <div class="subtitle">死亡不是永别，忘记才是</div>
      <div class="subtitle">为那些最珍贵的人做纪念</div>

      <div class="button-group">
        <van-button icon="star-o" type="primary" @click="personCreate">注册</van-button>
        <van-button icon="star-o" type="primary" @click="personCreate">新建人物</van-button>
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
  h2 {
    margin: 140px 0 80px 0;
  }
  .subtitle {
    margin: 40px 0 0 0;
  }
  .button-group {
    margin: 40px 0 0 0;
  }
}
</style>