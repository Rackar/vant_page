<template>
  <div>
    home
    <div>
      <h2>欢迎页</h2>
      <div>图片 美化</div>

      <div>remember me</div>

      <div>推荐</div>
      <div>
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
</style>