<template>
  <div>
    <van-button type="primary" text="显示遮罩层" @click="showImage()" />
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  components: {
    ImagePreview: ImagePreview.Component
  },
  props: {},
  data() {
    return { show: false };
  },
  watch: {},
  computed: {},
  methods: {
    showImage() {
      ImagePreview({
        images: [
          "https://img.yzcdn.cn/vant/apple-1.jpg",
          "https://img.yzcdn.cn/vant/apple-2.jpg"
        ],
        startPosition: 1,
        closeable: true
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>