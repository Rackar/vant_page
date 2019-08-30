<template>
  <div>
    <van-divider content-position="left">收藏</van-divider>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        icon="photo-o"
        text="文字"
        @click="jumpToSingle(value)"
      />
    </van-grid>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="全部收藏" value="展开" name="1" icon="shop-o">所有内容</van-collapse-item>
    </van-collapse>
    <van-divider content-position="left">历史</van-divider>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        icon="photo-o"
        text="文字"
        @click="jumpToSingle(value)"
      />
    </van-grid>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="全部历史" value="展开" name="2" icon="shop-o">
        <van-grid :gutter="10">
          <van-grid-item
            v-for="value in 8"
            :key="value"
            icon="photo-o"
            text="文字"
            @click="jumpToSingle(value)"
          />
        </van-grid>
      </van-collapse-item>
    </van-collapse>
    <!-- <van-divider content-position="left">推荐</van-divider>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        icon="photo-o"
        text="文字"
        @click="jumpToSingle(value)"
      />
    </van-grid>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"]
    };
  },
  methods: {
    jumpToSingle(value) {
      this.$router.push(`/single/${value}`);
    }
  }
};
</script>

<style scoped>
</style>