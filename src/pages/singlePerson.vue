<template>
  <div>
    <navBarTop />
    <div>
      <van-image round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <div>先生</div>
    <div>1900-2000</div>
    <div>大段记录大段记录大段记录大段记录大段记录大段记录大段记录大段记录</div>
    <div>
      <van-button round type="primary">文章</van-button>
      <van-button round type="primary">照片</van-button>
      <van-button round type="primary">编辑</van-button>
      <van-button round type="primary">分享</van-button>
      <van-button round type="primary">投诉</van-button>
    </div>
    <div>
      <van-cell
        v-for="item in articles"
        :key="item.id"
        :title="item.title"
        :to="'/article/'+item.id"
        :value="item.value"
      />
    </div>
  </div>
</template>

<script>
import navBarTop from "../components/navBarTop";
export default {
  components: {
    navBarTop
  },
  data() {
    return {
      articles: [
        { title: "在高考的那一年里", id: "2", value: "老大" },
        { title: "在高考的那一年里2", id: "3", value: "老2" }
      ]
    };
  }
};
</script>

<style>
</style>