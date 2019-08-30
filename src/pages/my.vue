<template>
  <div>
    <div>my</div>
    <div>
      <van-button icon="star-o" type="primary" @click="personCreate">新建人物</van-button>
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