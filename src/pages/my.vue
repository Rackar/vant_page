<template>
  <div>
    <div>个人中心</div>
    <div>
      <van-button icon="star-o" type="primary" @click="personCreate">新建人物</van-button>
    </div>
    <div>管理</div>
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
</style>