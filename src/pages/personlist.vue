<template>
  <div>
    <van-divider content-position="left">收藏</van-divider>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in favoriteList"
        :key="value.id"
        icon="photo-o"
        :text="value.name"
        @click="jumpToSingle(value.id)"
      />
    </van-grid>
    <!-- <van-collapse v-model="activeNames">
      <van-collapse-item title="全部收藏" value="展开" name="1" icon="shop-o">所有内容</van-collapse-item>
    </van-collapse>-->
    <van-divider content-position="left">历史</van-divider>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in favoriteList"
        :key="value.id"
        icon="photo-o"
        :text="value.name"
        @click="jumpToSingle(value.id)"
      />
    </van-grid>
    <!-- <van-collapse v-model="activeNames">
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
    </van-collapse>-->
  </div>
</template>

<script>
let singleStuc = {
  name: "姓名",
  avatar: "",
  id: "5d9a1eb2539da63860763ad4"
};
export default {
  data() {
    return {
      activeNames: ["1"],
      favoriteList: [],
      historyList: []
    };
  },
  methods: {
    jumpToSingle(id) {
      this.$router.push(`/single/${id}`);
    },
    fetchInitData() {
      for (let index = 0; index < 8; index++) {
        this.favoriteList.push(singleStuc);
        this.historyList.push(singleStuc);
      }
    }
  },
  created() {
    this.fetchInitData();
  }
};
</script>

<style scoped>
</style>