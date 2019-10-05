<template>
  <div>
    <navBarTop />
    <h3>{{article.title}}</h3>
    <div>{{article.contant}}</div>
    <div>前一篇 下一篇</div>
  </div>
</template>

<script>
import navBarTop from "../components/navBarTop";
export default {
  components: {
    navBarTop
  },
  props: {
    id: {
      type: String,
      default: "4"
    }
  },
  data() {
    return {
      article: { title: "标题", contant: "内容" }
    };
  },
  created() {
    this.fetchArticle(this.id);
  },
  methods: {
    fetchArticle(id = "0") {
      console.log(id);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>